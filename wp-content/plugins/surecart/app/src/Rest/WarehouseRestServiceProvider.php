<?php

namespace SureCart\Rest;

use SureCart\Rest\RestServiceInterface;
use SureCart\Controllers\Rest\WarehousesController;

/**
 * Service provider for Warehouse Rest Requests
 */
class WarehouseRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'warehouses';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = WarehousesController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'create', 'find', 'edit', 'delete' ];

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
	 * Get the collection params.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return [
			'page'     => [
				'description' => esc_html__( 'The page of items you want returned.', 'surecart' ),
				'type'        => 'integer',
			],
			'per_page' => [
				'description' => esc_html__( 'A limit on the number of items to be returned, between 1 and 100.', 'surecart' ),
				'type'        => 'integer',
			],
		];
	}

	/**
	 * Retrieve permissions.
	 *
	 * Reads also allow order editors: the fulfilment drawer needs the warehouse
	 * (ship-from) list to buy a label, and gating reads on shop settings alone
	 * stranded anyone who can fulfil an order but not manage settings. Writes
	 * stay restricted to shop managers below.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * List permissions.
	 *
	 * Same read broadening as `get_item_permissions_check()`.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' ) || current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Create permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function create_item_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Update permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}

	/**
	 * Delete permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access, WP_Error object otherwise.
	 */
	public function delete_item_permissions_check( $request ) {
		return current_user_can( 'manage_sc_shop_settings' );
	}
}
