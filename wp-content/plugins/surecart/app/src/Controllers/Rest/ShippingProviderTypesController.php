<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\ShippingProviderType;

/**
 * Handle ShippingProviderType requests through the REST API
 */
class ShippingProviderTypesController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = ShippingProviderType::class;

	/**
	 * Get the carrier accounts connected to a shipping provider.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return array|\WP_Error
	 */
	public function carrierAccounts( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->where( $request->get_query_params() )->carrierAccounts( $request['id'] );
	}

	/**
	 * Get the carrier parcel templates available to a shipping provider.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return array|\WP_Error
	 */
	public function carrierParcelTemplates( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}
		return $model->where( $request->get_query_params() )->carrierParcelTemplates( $request['id'] );
	}
}
