<div
	<?php echo wp_kses_data(
		get_block_wrapper_attributes(
			array(
				'style'            => 'width:' . esc_attr( $attributes['width'] ) . ';',
				'data-sc-block-id' => 'custom-amount',
			)
		)
	); ?>
	data-wp-bind--hidden="!context.selectedPrice.ad_hoc"
	hidden
>
	<label for="sc-product-custom-amount" class="sc-form-label">
		<?php echo wp_kses_post( $attributes['label'] ?? __( 'Enter an amount', 'surecart' ) ); ?>
	</label>

	<div class="sc-input-group">
		<span class="sc-input-group-text" id="basic-addon1" data-wp-text="context.selectedPrice.currency_symbol"></span>

		<?php
		// `type="text"`, not `number`: a number input drops any character it does
		// not recognise as a decimal mark before JS can read the value, gluing
		// "12٫90" into 1290. Mirrors sc-price-input. No `min`/`max` here — they are
		// inert on a text input, so `setAdHocAmount` enforces the ad-hoc range.
		?>
		<input
			class="sc-form-control"
			id="sc-product-custom-amount"
			type="text"
			inputmode="decimal"
			data-wp-bind--pattern="state.pricePattern"
			data-wp-bind--value="state.adHocAmountDisplay"
			data-wp-on--input="callbacks.setAdHocAmount"
			data-wp-bind--required="context.selectedPrice.ad_hoc"
		/>
	</div>
</div>
