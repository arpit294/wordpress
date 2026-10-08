<?php

namespace SureCart\Rest;

use SureCart\Rest\RestServiceInterface;
use SureCart\Controllers\Rest\ShipmentsController;

/**
 * Service provider for Shipment Rest Requests
 */
class ShipmentRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'shipments';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = ShipmentsController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'find', 'edit' ];

	/**
	 * Register REST Routes
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>[^/]+)/purchase/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'purchaseLabel' ),
					'permission_callback' => [ $this, 'purchase_label_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>[^/]+)/void/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'voidLabel' ),
					'permission_callback' => [ $this, 'void_label_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>[^/]+)/quote/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'quoteRates' ),
					'permission_callback' => [ $this, 'quote_rates_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Get our sample schema for a shipment.
	 *
	 * @return array The sample schema for a shipment
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			return $this->schema;
		}

		$this->schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => $this->endpoint,
			'type'       => 'object',
			'properties' => [
				'id' => [
					'description' => esc_html__( 'Unique identifier for the object.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
			],
		];

		return $this->schema;
	}

	/**
	 * Get the collection params.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return [
			'page'            => [
				'description' => esc_html__( 'The page of items you want returned.', 'surecart' ),
				'type'        => 'integer',
			],
			'per_page'        => [
				'description' => esc_html__( 'A limit on the number of items to be returned, between 1 and 100.', 'surecart' ),
				'type'        => 'integer',
			],
			'fulfillment_ids' => [
				'description' => esc_html__( 'Filter by fulfillment IDs.', 'surecart' ),
				'type'        => 'array',
				'items'       => [
					'type' => 'string',
				],
			],
			'status'          => [
				'description' => esc_html__( 'Filter by shipment status. Accepts a single value or array (e.g., `status[]=draft&status[]=quoted`).', 'surecart' ),
				'type'        => [ 'string', 'array' ],
				'items'       => [
					'type' => 'string',
				],
			],
			'ids'             => [
				'description' => esc_html__( 'Only return shipments with the given IDs.', 'surecart' ),
				'type'        => 'array',
				'items'       => [
					'type' => 'string',
				],
			],
			'expand'          => [
				'description' => esc_html__( 'Comma-separated or array list of related objects to expand.', 'surecart' ),
				'type'        => [ 'string', 'array' ],
				'items'       => [
					'type' => 'string',
				],
			],
		];
	}

	/**
	 * Retrieve permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return current_user_can( 'read_sc_orders' );
	}

	/**
	 * List permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		// Listing shipments — including with a fulfillment_ids filter — is an
		// admin operation requiring the global read_sc_orders cap. The earlier
		// per-fulfillment object-level branch passed a fulfillment ID to
		// read_sc_order, but that cap's map (OrderPermissionsController) calls
		// Order::find() with the ID and 404s for any fulfillment ID, so the
		// branch was effectively a no-op for non-admins and redundant for
		// admins (the global cap check inside read_sc_order short-circuits
		// first). Customer-facing access should use a dedicated endpoint.
		return current_user_can( 'read_sc_orders' );
	}

	/**
	 * Update permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' );
	}

	/**
	 * Purchase label permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function purchase_label_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' );
	}

	/**
	 * Void label permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function void_label_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' );
	}

	/**
	 * Re-quote rates permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function quote_rates_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' );
	}
}
