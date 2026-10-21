<?php

namespace SureCartBlocks\Blocks\Form;

use SureCart\Models\ManualPaymentMethod;
use SureCart\Models\Processor;
use SureCart\Support\PublicCatalogData;
use SureCartBlocks\Blocks\BaseBlock;

/**
 * Checkout block
 */
class Block extends BaseBlock {
	/**
	 * Get the style for the block
	 *
	 * @param  array $attributes Block attributes.
	 * @return string
	 */
	public function getStyle( $attributes ) {
		$style  = 'text-align: left;';
		$style .= '--sc-form-row-spacing: ' . ( $attributes['gap'] ?? '25' ) . ';';
		if ( ! empty( $attributes['color'] ) ) {
			$style .= '--sc-color-primary-500: ' . sanitize_hex_color( $attributes['color'] ) . ';';
			$style .= '--sc-focus-ring-color-primary: ' . sanitize_hex_color( $attributes['color'] ) . ';';
			$style .= '--sc-input-border-color-focus: ' . sanitize_hex_color( $attributes['color'] ) . ';';
		}
		return $style;
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		global $sc_form_id;
		$post = get_post( $sc_form_id );
		$user = wp_get_current_user();

		$processors = Processor::get();
		if ( is_wp_error( $processors ) ) {
			$processors = [];
		}

		// Hoist the optional text-override arrays to locals before subscript access.
		$loading_text = is_array( $attributes['loading_text'] ?? null ) ? $attributes['loading_text'] : [];
		$success_text = is_array( $attributes['success_text'] ?? null ) ? $attributes['success_text'] : [];

		// set the initial state.
		sc_initial_state(
			array_filter(
				[
					'checkout'   => [
						'formId'                        => $attributes['form_id'] ?? $sc_form_id,
						'mode'                          => apply_filters( 'surecart/payments/mode', $attributes['mode'] ?? 'live' ),
						// Serialized into public page state — strip private catalog fields.
						'product'                       => PublicCatalogData::product( $attributes['product'] ?? [] ),
						'currencyCode'                  => $attributes['currency'] ?? \SureCart::account()->currency,
						'groupId'                       => 'sc-checkout-' . ( $attributes['form_id'] ?? $sc_form_id ),
						'abandonedCheckoutEnabled'      => ! is_admin(),
						'captureGeoAddressEnabled'      => (bool) ( \SureCart::account()->order_protocol->capture_geo_address_enabled ?? false ),
						'geoAddressCapturableCountries' => array_values( (array) ( \SureCart::account()->order_protocol->geo_address_capturable_countries ?? [] ) ),
						'geoCapture'                    => [
							'title'        => (string) get_option( 'surecart_checkout_geo_capture_title' ),
							'content'      => (string) get_option( 'surecart_checkout_geo_capture_content' ),
							'allowLabel'   => (string) get_option( 'surecart_checkout_geo_capture_allow_label' ),
							'declineLabel' => (string) get_option( 'surecart_checkout_geo_capture_decline_label' ),
						],
						'showLoginPrompt'               => (bool) get_option( 'surecart_checkout_show_login_prompt', false ),
						'taxProtocol'                   => \SureCart::account()->tax_protocol,
						'isCheckoutPage'                => true,
						'validateStock'                 => ! is_admin(),
						'persist'                       => $this->getPeristance( $attributes, $attributes['form_id'] ?? $sc_form_id ),
					],
					'processors' => [
						'processors'           => array_values(
							array_filter(
								$processors ?? [],
								function ( $processor ) {
									return $processor->approved && $processor->enabled;
								}
							)
						),
						'manualPaymentMethods' => (array) ManualPaymentMethod::where( [ 'archived' => false ] )->get() ?? [],
						'config'               => [
							'stripe' => [
								'paymentElement' => (bool) get_option( 'sc_stripe_payment_element', true ),
							],
						],
					],
					'user'       => [
						'loggedIn'  => is_user_logged_in(),
						'email'     => $user->user_email,
						'name'      => $user->display_name,
						'avatarUrl' => is_user_logged_in() ? get_avatar_url( $user->user_email, [ 'size' => 48 ] ) : '',
					],
					'form'       => array_filter(
						[
							'text' => array_filter(
								[
									'loading' => array_filter(
										[
											'finalizing'  => $loading_text['finalizing'] ?? __( 'Submitting...', 'surecart' ),
											'paying'      => $loading_text['paying'] ?? __( 'Processing...', 'surecart' ),
											'confirming'  => $loading_text['confirming'] ?? __( 'Finalizing...', 'surecart' ),
											'confirmed'   => $loading_text['confirmed'] ?? __( 'Success!', 'surecart' ),
											'redirecting' => $loading_text['redirecting'] ?? __( 'Success! Redirecting...', 'surecart' ),
										]
									),
									'success' => array_filter(
										[
											'title'       => $success_text['title'] ?? __( 'Thank you!', 'surecart' ),
											'description' => $success_text['description'] ?? __( 'Your payment was successful. A receipt is on its way to your inbox.', 'surecart' ),
											'button'      => $success_text['button'] ?? __( 'Continue', 'surecart' ),
										]
									),
								]
							),
						]
					),
				]
			)
		);

		if ( ! empty( $attributes['prices'] ) ) {
			$line_items = $this->convertPricesToLineItems( $attributes['prices'] );
			sc_initial_state(
				[
					'checkout' => [
						'initialLineItems' => sc_initial_line_items( $line_items ),
					],
				]
			);
		}

		return \SureCart::block()->render(
			'blocks/form',
			[
				'align'            => $attributes['align'] ?? '',
				'modified'         => $post->post_modified_gmt ?? '',
				'honeypot_enabled' => (bool) get_option( 'surecart_honeypot_enabled', true ),
				'classes'          => $this->getClasses( $attributes ),
				'style'            => $this->getStyle( $attributes ),
				'content'          => $content,
				'id'               => 'sc-checkout-' . ( $attributes['form_id'] ?? $sc_form_id ),
				'success_url'      => $this->getSuccessUrl( $attributes ),
			]
		);
	}

	/**
	 * Get the URL the customer is sent to after a successful checkout.
	 *
	 * @param  array $attributes Block attributes.
	 * @return string
	 */
	public function getSuccessUrl( $attributes ) {
		$url = ! empty( $attributes['success_url'] ) ? $attributes['success_url'] : \SureCart::pages()->url( 'order-confirmation' );

		/**
		 * Filter the URL the customer is sent to after a successful checkout.
		 *
		 * A `success_url` in the checkout's metadata still wins over this — the
		 * front end prefers the per-checkout value so a single checkout can
		 * override the form it was created from.
		 *
		 * @param string $url        Success URL, or an empty string when no order confirmation page is set.
		 * @param array  $attributes Form block attributes.
		 */
		return (string) apply_filters( 'surecart/checkout/success_url', $url, $attributes );
	}

	/**
	 * Get persistent mode.
	 *
	 * @param  array $attributes Block attributes.
	 * @return string|false
	 */
	public function getPeristance( $attributes, $id = null ) {
		// don't persist in the admin.
		if ( is_admin() ) {
			return false;
		}

		// if there is a checkout id in the url, use url persistence.
		if ( ! empty( $_GET['checkout_id'] ) ) {
			return 'url';
		}

		// default checkout form should persist in the browser.
		if ( \SureCart::forms()->getDefaultId() === (int) $id ) {
			return 'browser';
		}

		// otherwise, use the attributes with url as the fallback.
		return $attributes['persist_cart'] ?? 'url';
	}

	/**
	 * Convert price blocks to line items
	 *
	 * @param array $prices Array of prices.
	 *
	 * @return array    Array of line items.
	 */
	public function convertPricesToLineItems( $prices ) {
		return array_values(
			array_map(
				function ( $price ) {
					return array_filter(
						[
							'price'         => $price['id'],
							'variant'       => $price['variant_id'] ?? null,
							'quantity'      => $price['quantity'] ?? 1,
							'ad_hoc_amount' => $price['ad_hoc_amount'] ?? null,
						]
					);
				},
				$prices
			)
		);
	}
}
