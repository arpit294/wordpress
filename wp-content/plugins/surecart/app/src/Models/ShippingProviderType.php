<?php

namespace SureCart\Models;

/**
 * ShippingProviderType model.
 */
class ShippingProviderType extends Model {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'shipping_providers';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'shipping_provider';

	/**
	 * Get the carrier accounts connected to a shipping provider.
	 *
	 * This is a list sub-resource, not a single fillable model, so we return
	 * the raw API response as-is.
	 *
	 * @param string $id Model id.
	 * @return array|\WP_Error
	 */
	protected function carrierAccounts( $id = null ) {
		if ( $id ) {
			$this->setAttribute( 'id', $id );
		}

		if ( empty( $this->attributes['id'] ) ) {
			return new \WP_Error( 'not_saved', __( 'Please provide a shipping provider.', 'surecart' ) );
		}

		return $this->makeRequest(
			[
				'method' => 'GET',
				'query'  => $this->query,
			],
			$this->endpoint . '/' . rawurlencode( $this->attributes['id'] ) . '/carrier_accounts'
		);
	}

	/**
	 * Get the carrier parcel templates available to a shipping provider.
	 *
	 * Carrier-defined packages (USPS Flat Rate boxes, FedEx paks, and so on).
	 * Like carrier accounts this is a read-only list sub-resource, so the raw
	 * API response is returned as-is.
	 *
	 * Availability differs between test and live mode providers, which is why
	 * the catalogue hangs off a provider rather than the account.
	 *
	 * @param string $id Model id.
	 * @return array|\WP_Error
	 */
	protected function carrierParcelTemplates( $id = null ) {
		if ( $id ) {
			$this->setAttribute( 'id', $id );
		}

		if ( empty( $this->attributes['id'] ) ) {
			return new \WP_Error( 'not_saved', __( 'Please provide a shipping provider.', 'surecart' ) );
		}

		return $this->makeRequest(
			[
				'method' => 'GET',
				'query'  => $this->query,
			],
			$this->endpoint . '/' . rawurlencode( $this->attributes['id'] ) . '/carrier_parcel_templates'
		);
	}
}
