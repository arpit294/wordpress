<?php

namespace SureCart\Rest;

use SureCart\Concerns\SanitizesRestParams;
use SureCart\Controllers\Rest\IntegrationProvidersController;
use SureCart\Controllers\Rest\IntegrationsController;
use SureCart\Models\Integration;
use SureCart\Rest\RestServiceInterface;

/**
 * Service provider for Price Rest Requests
 */
class IntegrationsRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	use SanitizesRestParams;

	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'integrations';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = IntegrationsController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'create' ];

	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\d+)',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => $this->callback( $this->controller, 'find' ),
					'permission_callback' => [ $this, 'get_item_permissions_check' ],
				],
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'edit' ),
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				[
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => $this->callback( $this->controller, 'delete' ),
					'permission_callback' => [ $this, 'delete_item_permissions_check' ],
				],
			]
		);
	}

	/**
	 * Get our sample schema for a post.
	 *
	 * @return array The sample schema for a post
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			// Since WordPress 5.3, the schema can be cached in the $schema property.
			return $this->schema;
		}

		$this->schema = [
			// This tells the spec of JSON Schema we are using which is draft 4.
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			// The title property marks the identity of the resource.
			'title'      => $this->endpoint,
			'type'       => 'object',
			// In JSON Schema you can specify object properties in the properties attribute.
			'properties' => [
				'id'         => [
					'description' => esc_html__( 'Unique identifier for the object.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
				'model_name' => [
					'description' => esc_html__( 'The SureCart model name.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'required'    => true,
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
			'model_ids'       => [
				'description' => esc_html__( 'The SureCart model id.', 'surecart' ),
				'type'        => 'array',
				'items'       => [
					'type' => 'string',
				],
				'default'     => [],
			],
			'integration_ids' => [
				'type'    => 'array',
				'items'   => [
					'type' => 'integer',
				],
				'default' => [],
			],
			'page'            => [
				'description' => esc_html__( 'The page of items you want returned.', 'surecart' ),
				'type'        => 'integer',
			],
			'per_page'        => [
				'description' => esc_html__( 'A limit on the number of items to be returned, between 1 and 100.', 'surecart' ),
				'type'        => 'integer',
				'minimum'     => 1,
				'maximum'     => 100,
			],
		];
	}

	/**
	 * Read permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return current_user_can( 'read_sc_products' );
	}

	/**
	 * List permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'read_sc_products' );
	}

	/**
	 * Create
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function create_item_permissions_check( $request ) {
		$provider = $this->sanitizeFilterParam( $request->get_param( 'provider' ) );
		if ( null === $provider || ! $this->canUseProvider( $provider ) ) {
			return false;
		}
		return current_user_can( 'publish_sc_products' );
	}

	/**
	 * Update
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		$provider = $this->sanitizeFilterParam( $request->get_param( 'provider' ) );

		// a partial update can omit the provider, so fall back to the stored
		// record — the controller's edit() re-validates the stored pair either way.
		if ( null === $provider && ! empty( $request['id'] ) ) {
			$existing = Integration::find( sanitize_text_field( $request['id'] ) );
			if ( ! is_wp_error( $existing ) ) {
				$provider = $existing->provider;
			}
		}

		if ( null !== $provider && ! $this->canUseProvider( $provider ) ) {
			return false;
		}

		return current_user_can( 'edit_sc_products' );
	}

	/**
	 * Whether the current user may save an integration for this provider.
	 *
	 * The provider must be registered under this exact slug. The `provider`
	 * column is compared case-insensitively by MySQL when integrations are
	 * dispatched on purchase, so a slug variant like `SureCart/User-Role`
	 * would otherwise dodge every string comparison here yet still run.
	 *
	 * @param string $provider The sanitized provider slug.
	 *
	 * @return bool
	 */
	protected function canUseProvider( $provider ) {
		if ( ! has_filter( "surecart/integrations/providers/find/{$provider}" ) ) {
			return false;
		}

		// assigning a WordPress role requires the native role-granting capability.
		if ( 'surecart/user-role' === $provider && ! current_user_can( 'promote_users' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Delete.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function delete_item_permissions_check( $request ) {
		return current_user_can( 'delete_sc_products' );
	}
}
