<?php

namespace SureCart\Models;

use SureCart\Models\Traits\HasDates;

/**
 * Shipment model.
 */
class Shipment extends Model {
	use HasDates;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'shipments';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'shipment';

	/**
	 * Purchase a shipping label.
	 *
	 * @param string $id Model id.
	 * @return $this|false|\WP_Error
	 */
	protected function purchaseLabel( $id = null ) {
		if ( $id ) {
			$this->setAttribute( 'id', $id );
		}

		if ( $this->fireModelEvent( 'purchasing_label' ) === false ) {
			return false;
		}

		if ( empty( $this->attributes['id'] ) ) {
			return new \WP_Error( 'not_saved', __( 'Please create the shipment.', 'surecart' ) );
		}

		$attributes = $this->attributes;
		unset( $attributes['id'] );

		$purchased = $this->makeRequest(
			[
				'method' => 'PATCH',
				'query'  => $this->query,
				'body'   => [
					$this->object_name => $attributes,
				],
			],
			$this->endpoint . '/' . rawurlencode( $this->attributes['id'] ) . '/purchase/'
		);

		if ( is_wp_error( $purchased ) ) {
			return $purchased;
		}

		$this->resetAttributes();

		$this->fill( $purchased );

		$this->fireModelEvent( 'purchased_label' );

		return $this;
	}

	/**
	 * Void a shipping label.
	 *
	 * @param string $id Model id.
	 * @return $this|false|\WP_Error
	 */
	protected function voidLabel( $id = null ) {
		if ( $id ) {
			$this->setAttribute( 'id', $id );
		}

		if ( $this->fireModelEvent( 'voiding_label' ) === false ) {
			return false;
		}

		if ( empty( $this->attributes['id'] ) ) {
			return new \WP_Error( 'not_saved', __( 'Please create the shipment.', 'surecart' ) );
		}

		$voided = $this->makeRequest(
			[
				'method' => 'PATCH',
				'query'  => $this->query,
			],
			$this->endpoint . '/' . rawurlencode( $this->attributes['id'] ) . '/void/'
		);

		if ( is_wp_error( $voided ) ) {
			return $voided;
		}

		$this->resetAttributes();

		$this->fill( $voided );

		$this->fireModelEvent( 'voided_label' );

		return $this;
	}

	/**
	 * Quote shipment rates.
	 *
	 * @param string $id Model id.
	 * @return $this|false|\WP_Error
	 */
	protected function quoteRates( $id = null ) {
		if ( $id ) {
			$this->setAttribute( 'id', $id );
		}

		if ( $this->fireModelEvent( 'quoting_rates' ) === false ) {
			return false;
		}

		if ( empty( $this->attributes['id'] ) ) {
			return new \WP_Error( 'not_saved', __( 'Please create the shipment.', 'surecart' ) );
		}

		$quoted = $this->makeRequest(
			[
				'method' => 'PATCH',
				'query'  => $this->query,
			],
			$this->endpoint . '/' . rawurlencode( $this->attributes['id'] ) . '/quote/'
		);

		if ( is_wp_error( $quoted ) ) {
			return $quoted;
		}

		$this->resetAttributes();

		$this->fill( $quoted );

		$this->fireModelEvent( 'quoted_rates' );

		return $this;
	}
}
