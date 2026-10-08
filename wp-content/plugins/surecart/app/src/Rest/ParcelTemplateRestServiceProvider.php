<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\ParcelTemplateController;
use SureCart\Rest\RestServiceInterface;

/**
 * Service provider for Parcel Template Rest Requests
 */
class ParcelTemplateRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'parcel_templates';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = ParcelTemplateController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'find', 'edit', 'create', 'delete' ];

	/**
	 * Get our sample schema for a parcel template.
	 *
	 * @return array The sample schema for a parcel template
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
	 * Retrieve permissions.
	 *
	 * Matches the list check — order editors who can list templates must also be
	 * able to hydrate a single record (core-data refetches by id after a save).
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to retrieve items, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * List permissions.
	 *
	 * Also allows order editors: the fulfilment drawer lists parcel templates so
	 * a label can be bought against a saved box. Gating this on shop settings
	 * alone left the Saved templates tab empty for anyone who can fulfil an
	 * order but not manage settings.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to list items, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Create permissions
	 *
	 * Also allows order editors, so a box measured while packing can be saved
	 * for reuse without a trip to Settings. Editing and deleting stay restricted
	 * to shop managers — those change templates other people's shipments use.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function create_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Update permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to update items, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Delete permissions
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to delete items, WP_Error object otherwise.
	 */
	public function delete_item_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}
}
