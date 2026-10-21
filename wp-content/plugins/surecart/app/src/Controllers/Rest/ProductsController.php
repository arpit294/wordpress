<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\RestrictsAnonymousReads;
use SureCart\Models\Product;
use SureCart\Models\Purchase;
use SureCart\Models\User;

/**
 * Handle Product requests through the REST API
 */
class ProductsController extends RestController {
	use RestrictsAnonymousReads;

	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Product::class;

	/**
	 * Capability that unlocks unrestricted reads.
	 *
	 * @var string
	 */
	protected $edit_capability = 'edit_sc_products';

	/**
	 * Expands safe to forward for anonymous callers.
	 *
	 * @var array
	 */
	protected $anonymous_expands = [ 'prices', 'variants', 'variant_options', 'product_medias', 'product_media.media', 'product_collections', 'featured_product_media' ];

	/**
	 * Query filters forced for anonymous callers.
	 *
	 * Archived products stay readable on find — grandfathered subscriptions
	 * reference them when switching plans on the customer dashboard.
	 *
	 * @var array
	 */
	protected $anonymous_scope = [
		'archived' => false,
		'status'   => [ 'published' ],
	];

	/**
	 * Only published products are visible on find for anonymous callers.
	 *
	 * @var array
	 */
	protected $anonymous_visible_statuses = [ 'published' ];

	/**
	 * Resource slug for the dynamic list filter hooks
	 * (`surecart/products/list/query_args`, `.../list/response`).
	 *
	 * @var string
	 */
	protected $resource = 'products';

	/**
	 * Relations expanded by default for edit-context and write requests.
	 *
	 * The product edit screen and the WP post sync depend on the full set.
	 *
	 * @var array
	 */
	const EDIT_EXPANDS = [ 'variants', 'variant_options', 'variants.image', 'prices', 'product_collections', 'commission_structure', 'product_medias', 'product_media.media' ];

	/**
	 * Controller-specific middleware hook, run after the anonymous restriction.
	 *
	 * Expand contract for edit-context/write requests:
	 * - Collection GET with `expand_mode=replace`: the client's `expand` is used
	 *   verbatim (may be empty) — lets the products dataview request a lean list.
	 * - Collection GET without `expand_mode=replace`: EDIT_EXPANDS merged with any
	 *   client `expand` (default; `expand` is additive).
	 * - Single GET (`id` param) and all write methods: EDIT_EXPANDS merged with
	 *   any client `expand`.
	 * - `view` context GETs are untouched; `expand` passes through query args.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function catalogMiddleware( $class, \WP_REST_Request $request ) {
		$is_write      = in_array( $request->get_method(), [ 'POST', 'PUT', 'PATCH', 'DELETE' ], true );
		$client_expand = array_values( array_unique( array_filter( (array) ( $request['expand'] ?? [] ) ) ) );

		if ( 'edit' === $request->get_param( 'context' ) || $is_write ) {
			$is_collection_get = ! $is_write && empty( $request->get_param( 'id' ) );
			// Only an explicit opt-in replaces the defaults; otherwise `expand` is additive.
			$replace = $is_collection_get && 'replace' === $request->get_param( 'expand_mode' );

			$class->with(
				$replace
					? $client_expand                                                                  // lean: the client owns the relation set.
					: array_values( array_unique( array_merge( self::EDIT_EXPANDS, $client_expand ) ) ) // additive: defaults plus any client expand (re-indexed so an overlap can't leave a sparse array).
			);
		}

		return $class;
	}

	/**
	 * Let a logged-in customer read their own hidden (draft) product.
	 *
	 * Subscriptions keep referencing a product after it moves back to draft,
	 * and the dashboard switch UI fetches that product by id — the same
	 * grandfathering reason archived stays readable on find (see $anonymous_scope).
	 * Anonymous callers always keep the 404; access is only granted when the
	 * current user's customer owns an unrevoked purchase of this exact product.
	 *
	 * @param \SureCart\Models\Product $model Fetched product.
	 *
	 * @return boolean
	 */
	protected function anonymousCanViewHidden( $model ) {
		$customer_ids = $this->currentCustomerIds();
		if ( empty( $customer_ids ) || empty( $model->id ) ) {
			return false;
		}

		return $this->ownsAnyProduct( $customer_ids, [ $model->id ] );
	}

	/**
	 * Let a customer list draft products of an upgrade group they belong to.
	 *
	 * Upgrade groups often hold members-only (draft) products, and the dashboard
	 * switch UI lists the group to offer them. Only widened for a single group
	 * the customer owns an unrevoked purchase in; archived stays excluded.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return array
	 */
	protected function anonymousScope( \WP_REST_Request $request ) {
		$group_ids = array_values( array_filter( (array) $request->get_param( 'product_group_ids' ), 'is_string' ) );
		if ( 1 !== count( $group_ids ) || ! $this->ownsProductInGroup( $group_ids[0] ) ) {
			return $this->anonymous_scope;
		}

		// pin the group so the widened status can never apply to another listing.
		return [
			'archived'          => false,
			'status'            => [ 'published', 'draft' ],
			'product_group_ids' => $group_ids,
		];
	}

	/**
	 * Does the current customer own an unrevoked purchase of any product in this group?
	 *
	 * @param string $group_id Product group id.
	 *
	 * @return boolean
	 */
	protected function ownsProductInGroup( $group_id ) {
		$customer_ids = $this->currentCustomerIds();
		if ( empty( $customer_ids ) ) {
			return false;
		}

		// unscoped on purpose: the owned product itself may be draft or archived (grandfathered).
		$products = Product::where( [ 'product_group_ids' => [ $group_id ] ] )->get();
		if ( is_wp_error( $products ) || empty( $products ) ) {
			return false;
		}

		return $this->ownsAnyProduct( $customer_ids, array_map( fn( $product ) => $product->id, $products ) );
	}

	/**
	 * Customer ids of the logged-in user.
	 *
	 * Must be a sequential list — the platform ignores (rather than filters on)
	 * associative customer_ids (see ModelPermissionsController::isListingOwnCustomerIds).
	 *
	 * @return array
	 */
	protected function currentCustomerIds() {
		if ( ! is_user_logged_in() ) {
			return [];
		}

		return array_values( array_filter( (array) User::current()->customerIds() ) );
	}

	/**
	 * Do these customers hold an unrevoked purchase of any of these products?
	 *
	 * @param array $customer_ids Customer ids.
	 * @param array $product_ids  Product ids.
	 *
	 * @return boolean
	 */
	protected function ownsAnyProduct( $customer_ids, $product_ids ) {
		$product_ids = array_values( array_filter( $product_ids ) );
		if ( empty( $product_ids ) ) {
			return false;
		}

		$purchase = Purchase::where(
			[
				'customer_ids' => $customer_ids,
				'product_ids'  => $product_ids,
				'revoked'      => false,
			]
		)->first();

		// fail closed on a lookup error or no purchase.
		if ( is_wp_error( $purchase ) || empty( $purchase ) ) {
			return false;
		}

		// don't trust the platform filters alone.
		return empty( $purchase->revoked ) && in_array( $purchase->product_id, $product_ids, true );
	}

	/**
	 * Edit model.
	 *
	 * Filter out variations which statuses are draft.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function edit( \WP_REST_Request $request ) {
		// if cataloged_at is set for future date, return error.
		if ( ! empty( $request['cataloged_at'] ) && $request['cataloged_at'] > time() ) {
			return new \WP_Error( 'invalid_cataloged_at', __( 'The Cataloged at date cannot be in the future. Please provide a valid date.', 'surecart' ), [ 'status' => 400 ] );
		}

		// Stop if we are not editing a variable product.
		if ( empty( $request['variants'] ) ) {
			return parent::edit( $request );
		}

		// Filter draft variations.
		$request['variants'] = array_values(
			array_filter(
				$request['variants'],
				function ( $variation ) {
					return ! in_array( $variation['status'] ?? 'publish', [ 'draft', 'deleted' ] );
				}
			)
		);

		return parent::edit( $request );
	}

	/**
	 * Sync model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function sync( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->sync( $request['id'] );
	}

	/**
	 * Sync model.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function syncAll() {
		return \SureCart::sync()->products()->dispatch();
	}

	/**
	 * Duplicate model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function duplicate( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->duplicate( $request['id'] );
	}

	/**
	 * Import WooCommerce products.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function importWooCommerce() {
		if ( ! class_exists( 'WooCommerce' ) ) {
			return new \WP_Error(
				'woocommerce_not_active',
				__( 'WooCommerce is not active.', 'surecart' ),
				[ 'status' => 400 ]
			);
		}

		$service = \SureCart::sync()->woocommerce_products();

		if ( $service->isRunning() ) {
			return new \WP_Error(
				'import_already_running',
				__( 'A WooCommerce import is already in progress.', 'surecart' ),
				[ 'status' => 409 ]
			);
		}

		$result = $service->dispatch();
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return rest_ensure_response( [ 'message' => __( 'WooCommerce import started.', 'surecart' ) ] );
	}

	/**
	 * Get count of importable WooCommerce products.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function wooCommerceCount() {
		if ( ! class_exists( 'WooCommerce' ) ) {
			return rest_ensure_response( [ 'count' => 0 ] );
		}

		$count = \SureCart::sync()->woocommerce_products()->getImportableCount();

		return rest_ensure_response( [ 'count' => $count ] );
	}
}
