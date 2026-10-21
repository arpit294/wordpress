<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Shipment;

/**
 * Handle Shipment requests through the REST API
 */
class ShipmentsController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Shipment::class;

	/**
	 * Purchase a shipping label.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return Shipment|false|\WP_Error
	 */
	public function purchaseLabel( \WP_REST_Request $request ) {
		$class     = new $this->class( $request->get_json_params() );
		$class->id = $request['id'];
		$model     = $this->middleware( $class, $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->where( $request->get_query_params() )->purchaseLabel( $request['id'] );
	}

	/**
	 * Void a shipping label.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return Shipment|false|\WP_Error
	 */
	public function voidLabel( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->where( $request->get_query_params() )->voidLabel( $request['id'] );
	}

	/**
	 * Re-quote shipment rates.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return Shipment|false|\WP_Error
	 */
	public function quoteRates( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->where( $request->get_query_params() )->quoteRates( $request['id'] );
	}
}
