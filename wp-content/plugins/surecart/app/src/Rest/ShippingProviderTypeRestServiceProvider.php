<?php

namespace SureCart\Rest;

use SureCart\Rest\RestServiceInterface;
use SureCart\Controllers\Rest\ShippingProviderTypesController;

/**
 * Service provider for ShippingProvider Rest Requests
 */
class ShippingProviderTypeRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'shipping_providers';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = ShippingProviderTypesController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'find' ];

	/**
	 * Register REST Routes
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>[^/]+)/carrier_accounts',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => $this->callback( $this->controller, 'carrierAccounts' ),
					'permission_callback' => [ $this, 'carrier_accounts_permissions_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>[^/]+)/carrier_parcel_templates',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => $this->callback( $this->controller, 'carrierParcelTemplates' ),
					'permission_callback' => [ $this, 'carrier_parcel_templates_permissions_check' ],
					'args'                => [
						'carrier_token' => [
							'description' => esc_html__( 'Only return templates for this carrier, by token or display name.', 'surecart' ),
							'type'        => 'string',
						],
					],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Carrier account permissions.
	 *
	 * Settings-only data (used to pick services for live rates), so this stays
	 * manager-only even though the provider list itself is readable by order
	 * editors.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function carrier_accounts_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Carrier parcel template permissions.
	 *
	 * Read-only carrier reference data consumed by the fulfilment drawer, so
	 * this tracks the shipment quote capability rather than the
	 * `manage_sc_shop_settings` used by the settings-only routes above. Gating
	 * it on shop settings would stop an order editor from buying a label.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function carrier_parcel_templates_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Get our sample schema for a post.
	 *
	 * @return array The sample schema for a post
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
	 * List permissions.
	 *
	 * Reads also allow order editors: the fulfilment drawer must know which
	 * provider (and mode) to quote against before a label can be bought.
	 * Connecting/configuring providers still happens app-side and the
	 * carrier_accounts route above stays manager-only.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Single item permissions.
	 *
	 * Same read broadening as `get_items_permissions_check()`.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}
}
