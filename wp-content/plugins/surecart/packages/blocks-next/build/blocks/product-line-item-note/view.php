<?php
$has_label     = isset( $attributes['label'] ) ? '' !== $attributes['label'] : true;
$label_text    = ! empty( $attributes['label'] ) ? $attributes['label'] : __( 'Note', 'surecart' );
$context_label = isset( $attributes['label'] ) ? $attributes['label'] : __( 'Note', 'surecart' );
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	<?php
	echo wp_kses_data(
		wp_interactivity_data_wp_context(
			[
				'label' => $context_label,
				'rows'  => 1,
			]
		)
	);
	?>
	>
	<?php if ( $has_label ) : ?>
		<label class="sc-form-label" for="sc_product_note">
			<?php echo wp_kses_post( $label_text ); ?>
		</label>
	<?php endif; ?>

	<textarea
		class="sc-form-control"
		name="sc_product_note"
		id="sc_product_note"
		placeholder="<?php echo esc_attr( ! empty( $attributes['placeholder'] ) ? $attributes['placeholder'] : __( 'Add a note (optional)', 'surecart' ) ); ?>"
		data-wp-bind--rows="context.rows"
		data-wp-bind--value="context.lineItemNote"
		data-wp-on--input="callbacks.setLineItemNote"
		data-wp-on--click="callbacks.expandLineItemNote"
		data-wp-on--focus="callbacks.expandLineItemNote"
		maxlength="485"
	></textarea>

	<?php if ( ! empty( $attributes['help_text'] ) ) : ?>
		<div class="sc-help-text">
			<?php echo wp_kses_post( $attributes['help_text'] ); ?>
		</div>
	<?php endif; ?>
</div>
