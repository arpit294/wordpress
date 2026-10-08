<?php $label = ! empty( $attributes['label'] ) ? $attributes['label'] : __( 'Clear all', 'surecart' ); ?>
<a
	<?php echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'aria-label'      => wp_strip_all_tags( $label ),
				'aria-labelledby' => wp_strip_all_tags( $label ),
			]
		)
	); ?>
	href="<?php echo esc_url( $clear_all_url ); ?>"
	data-wp-on--click="surecart/product-review::actions.navigate"
	data-wp-on--mouseenter="surecart/product-review::actions.prefetch"
>
	<?php echo wp_kses_post( $label ); ?>
</a>

