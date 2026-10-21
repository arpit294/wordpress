<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Fulfillment;

/**
 * Handle Fulfillment requests through the REST API
 */
class FulfillmentsController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Fulfillment::class;

	/**
	 * Shipment fields safe to expose to customers.
	 *
	 * @var array
	 */
	protected $customer_shipment_fields = [ 'id', 'object', 'status', 'tracking_number', 'tracking_url', 'carrier' ];

	/**
	 * Index fulfillments.
	 *
	 * Filters expanded shipments down to tracking fields for non-merchants.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function index( \WP_REST_Request $request ) {
		$response = parent::index( $request );

		if ( is_wp_error( $response ) || current_user_can( 'read_sc_orders' ) ) {
			return $response;
		}

		$fulfillments = $response->get_data();

		foreach ( (array) $fulfillments as $fulfillment ) {
			$shipments = $fulfillment->shipments ?? null;
			if ( empty( $shipments->data ) || ! is_array( $shipments->data ) ) {
				continue;
			}

			// The platform inlines rates, label costs and the label download URL on shipments — merchant-only data.
			$shipments->data = array_map(
				function ( $shipment ) {
					$slim = [];
					foreach ( $this->customer_shipment_fields as $field ) {
						$slim[ $field ] = $shipment->$field ?? null;
					}
					return (object) $slim;
				},
				$shipments->data
			);

			$fulfillment->shipments = $shipments;
		}

		$response->set_data( $fulfillments );

		return $response;
	}
}
