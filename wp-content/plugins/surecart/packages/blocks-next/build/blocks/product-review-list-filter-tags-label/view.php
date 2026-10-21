<?php $label = $attributes['label'] ?? __( 'Applied Filters', 'surecart' ); ?>
<span
	<?php echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'id' => 'filter-review-label-' . $sc_query_id,
			]
		)
	); ?>
>
	<?php echo wp_kses_post( $label ); ?>
</span>

