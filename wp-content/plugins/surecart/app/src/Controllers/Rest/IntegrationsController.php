<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\SanitizesRestParams;
use SureCart\Models\Integration;

/**
 * Handle Price requests through the REST API
 */
class IntegrationsController extends RestController {
	use SanitizesRestParams;

	/**
	 * The model class.
	 *
	 * @var string
	 */
	protected $class = Integration::class;

	/**
	 * Create a product integration.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function create( \WP_REST_Request $request ) {
		$valid = $this->validateIntegrationItem( $this->sanitizeFilterParam( $request->get_param( 'provider' ) ), $request->get_param( 'integration_id' ) );
		if ( is_wp_error( $valid ) ) {
			return $valid;
		}

		do_action( 'surecart/integrations/create', $request->get_params() );
		return Integration::create( $request->get_params() );
	}

	/**
	 * Validate the item id against the provider that will consume it.
	 *
	 * The registered provider service decides whether the id is one of its
	 * own items — this stops arbitrary ids (roles, memberships, courses)
	 * from being stored and later granted on purchase.
	 *
	 * @param string|null $provider       The sanitized integration provider slug.
	 * @param mixed       $integration_id The raw provider item id.
	 *
	 * @return true|\WP_Error
	 */
	protected function validateIntegrationItem( $provider, $integration_id ) {
		// an unregistered slug has no service to validate against, and MySQL would
		// still match a case variant of a real one on dispatch — so refuse it outright.
		if ( null === $provider || ! has_filter( "surecart/integrations/providers/find/{$provider}" ) ) {
			return new \WP_Error(
				'invalid_integration_provider',
				__( 'This integration provider is not available.', 'surecart' ),
				[ 'status' => 400 ]
			);
		}

		// skip only when the id is genuinely absent — empty() would also skip a literal "0" id.
		if ( null === $integration_id || '' === $integration_id ) {
			return true;
		}

		if ( false === apply_filters( "surecart/integrations/providers/{$provider}/is_valid_item", true, $integration_id ) ) {
			return new \WP_Error(
				'invalid_integration_item',
				__( 'This item is not available for this integration.', 'surecart' ),
				[ 'status' => 400 ]
			);
		}

		return true;
	}

	/**
	 * List all product integrations.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function index( \WP_REST_Request $request ) {
		$integration = new Integration();

		// integration model ids.
		$integration_ids = $request->get_param( 'integration_ids' );
		if ( ! empty( $integration_ids ) ) {
			$integration = $integration->whereIn( 'integration_id', array_map( 'sanitize_text_field', (array) $integration_ids ) );
		}

		// model ids.
		$model_ids = $request->get_param( 'model_ids' );
		if ( ! empty( $model_ids ) ) {
			$integration = $integration->whereIn( 'model_id', array_map( 'sanitize_text_field', (array) $model_ids ) );
		}

		$total    = $integration->count();
		$page     = $request->get_param( 'page' ) ? $request->get_param( 'page' ) : 1;
		$per_page = $request->get_param( 'per_page' ) ? $request->get_param( 'per_page' ) : 10;

		// handle pagination.
		$items = $integration->paginate(
			[
				'page'     => $page,
				'per_page' => $per_page,
			]
		);

		$response = rest_ensure_response( $items );
		$response->header( 'X-WP-Total', (int) $total );
		$response->header( 'X-WP-TotalPages', (int) ceil( $total / (int) $per_page ) );

		return $response;
	}

	/**
	 * Find a specific product integration.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function find( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		return $model->where(
			array_filter(
				[
					'model_id'       => $this->sanitizeFilterParam( $request->get_param( 'model_id' ) ),
					'integration_id' => $this->sanitizeFilterParam( $request->get_param( 'integration_id' ) ),
					'model_name'     => $this->sanitizeFilterParam( $request->get_param( 'model_name' ) ),
					'provider'       => $this->sanitizeFilterParam( $request->get_param( 'provider' ) ),
				],
				function ( $value ) {
					return null !== $value;
				}
			)
		)->find( $this->sanitizeFilterParam( $request['id'] ) );
	}

	/**
	 * Edit model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function edit( \WP_REST_Request $request ) {
		// Match by primary key from the URL (not body) so the row updated is the one authorized.
		$url_params = $request->get_url_params();
		$id         = $this->sanitizeFilterParam( $url_params['id'] ?? '' );

		if ( empty( $id ) ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Missing integration id.', 'surecart' ),
				[ 'status' => 400 ]
			);
		}

		$model = $this->middleware( new $this->class( $id ), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		// Whitelist mutable columns. The body could contain any fillable field;
		// only these four make sense to edit on an existing integration.
		// Cast guards against null bodies and non-array JSON payloads.
		$body    = (array) ( $request->get_json_params() ?? [] );
		$allowed = array_map(
			[ $this, 'sanitizeFilterParam' ],
			array_intersect_key(
				$body,
				array_flip( [ 'integration_id', 'price_id', 'variant_id', 'provider' ] )
			)
		);

		// Fall back to the stored record so a partial update cannot skip validation.
		// A missing row is left for update() below, which 404s with the right status.
		$existing = Integration::find( $id );
		if ( ! is_wp_error( $existing ) ) {
			$valid = $this->validateIntegrationItem(
				$allowed['provider'] ?? $existing->provider,
				$allowed['integration_id'] ?? $existing->integration_id
			);
			if ( is_wp_error( $valid ) ) {
				return $valid;
			}
		}

		return $model->where( [ 'id' => $id ] )->update( $allowed );
	}

	/**
	 * Delete model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function delete( \WP_REST_Request $request ) {
		do_action( 'surecart/integrations/delete', $request->get_params() );
		return ( new $this->class() )->delete( $request['id'] );
	}
}
