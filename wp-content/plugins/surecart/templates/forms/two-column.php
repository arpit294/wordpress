<?php
/**
 * Donation form block pattern
 */
return [
	'title'      => __( 'Two Column', 'surecart' ),
	'categories' => [ 'surecart_form' ],
	'blockTypes' => [],
	'content'    => '<!-- wp:surecart/columns {"backgroundColor":"background"} -->
	<sc-columns class="wp-block-surecart-columns has-background-background-color has-background"><!-- wp:surecart/column {"verticalAlignment":"top","sticky":true,"stickyOffset":"50px"} -->
		<sc-column class="wp-block-surecart-column is-vertically-aligned-top is-sticky" style="top:50px" stickyoffset="50px"><!-- wp:surecart/heading {"title":' . wp_json_encode( __( 'Order Summary', 'surecart' ) ) . '} -->
		<sc-heading>' . esc_html__( 'Order Summary', 'surecart' ) . '<span slot="description"></span><span slot="end"></span></sc-heading>
		<!-- /wp:surecart/heading -->

		<!-- wp:surecart/totals -->
		<sc-order-summary class="wp-block-surecart-totals"><!-- wp:surecart/divider -->
		<sc-divider></sc-divider>
		<!-- /wp:surecart/divider -->

		<!-- wp:surecart/line-items -->
		<sc-line-items removable="1" editable="1" class="wp-block-surecart-line-items"></sc-line-items>
		<!-- /wp:surecart/line-items -->

		<!-- wp:surecart/divider -->
		<sc-divider></sc-divider>
		<!-- /wp:surecart/divider -->

		<!-- wp:surecart/subtotal -->
		<sc-line-item-total total="subtotal" class="wp-block-surecart-subtotal"><span slot="description">Subtotal</span></sc-line-item-total>
		<!-- /wp:surecart/subtotal -->

		<!-- wp:surecart/trial-line-item /-->

		<!-- wp:surecart/coupon {"button_text":' . wp_json_encode( __( 'Apply Coupon', 'surecart' ) ) . '} -->
		<sc-order-coupon-form label="Add Coupon Code">' . esc_html__( 'Apply Coupon', 'surecart' ) . '</sc-order-coupon-form>
		<!-- /wp:surecart/coupon -->

		<!-- wp:surecart/tax-line-item -->
		<sc-line-item-tax class="wp-block-surecart-tax-line-item"></sc-line-item-tax>
		<!-- /wp:surecart/tax-line-item -->

		<!-- wp:surecart/divider -->
		<sc-divider></sc-divider>
		<!-- /wp:surecart/divider -->

		<!-- wp:surecart/total -->
		<sc-line-item-total total="total" size="large" show-currency="1" class="wp-block-surecart-total"><span slot="title">Total</span><span slot="subscription-title">Total Due Today</span></sc-line-item-total>
		<!-- /wp:surecart/total --></sc-order-summary>
		<!-- /wp:surecart/totals --></sc-column>
		<!-- /wp:surecart/column -->

		<!-- wp:surecart/column {"style":{"spacing":{"padding":{"top":"0px","right":"0px","bottom":"0px","left":"0px"}}}} -->
		<sc-column class="wp-block-surecart-column" style="padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">

			<!-- wp:surecart/price-selector {"label":' . wp_json_encode( __( 'Choose A Plan', 'surecart' ) ) . '} -->
	<sc-price-choices label="' . esc_attr__( 'Choose A Plan', 'surecart' ) . '" type="radio" columns="1"><div><!-- wp:surecart/price-choice -->
		<sc-price-choice type="radio" show-label="1" show-price="1" show-control="1"></sc-price-choice>
		<!-- /wp:surecart/price-choice --></div></sc-price-choices>
		<!-- /wp:surecart/price-selector -->

		<!-- wp:surecart/heading {"title":' . wp_json_encode( __( 'Contact Information', 'surecart' ) ) . '} -->
		<sc-heading>' . esc_html__( 'Contact Information', 'surecart' ) . '<span slot="description"></span><span slot="end"></span></sc-heading>
		<!-- /wp:surecart/heading -->

		<!-- wp:surecart/email {"label":' . wp_json_encode( __( 'Email Address', 'surecart' ) ) . '} -->
		<sc-customer-email label="' . esc_attr__( 'Email Address', 'surecart' ) . '" autocomplete="email" inputmode="email" required class="wp-block-surecart-email"></sc-customer-email>
		<!-- /wp:surecart/email -->

		<!-- wp:surecart/password -->
		<sc-order-password label="Password" placeholder="" size="medium" type="password" name="password" value="" class="wp-block-surecart-password"></sc-order-password>
		<!-- /wp:surecart/password -->

		<!-- wp:surecart/payment {"secure_notice":' . wp_json_encode( __( 'This is a secure, encrypted payment', 'surecart' ) ) . '} -->
		<sc-payment label="Payment" secure-notice="' . esc_attr__( 'This is a secure, encrypted payment', 'surecart' ) . '" class="wp-block-surecart-payment"></sc-payment>
		<!-- /wp:surecart/payment -->

		<!-- wp:surecart/switch {"required":true,"label":' . wp_json_encode( __( 'I agree to the purchase terms.', 'surecart' ) ) . ',"description":' . wp_json_encode( __( 'You can find these on our terms page.', 'surecart' ) ) . '} -->
		<sc-switch name="switch" required class="wp-block-surecart-switch">' . esc_html__( 'I agree to the purchase terms.', 'surecart' ) . '<span slot="description">' . esc_html__( 'You can find these on our terms page.', 'surecart' ) . '</span></sc-switch>
		<!-- /wp:surecart/switch -->

		<!-- wp:surecart/submit {"show_total":true,"full":true} -->
	<sc-order-submit type="primary" full="true" size="large" icon="lock" show-total="true" class="wp-block-surecart-submit">Purchase</sc-order-submit>
	<!-- /wp:surecart/submit --></sc-column>
		<!-- /wp:surecart/column --></sc-columns>
		<!-- /wp:surecart/columns -->
	',
];
