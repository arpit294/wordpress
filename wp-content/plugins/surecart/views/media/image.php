<figure
	data-wp-interactive='{ "namespace": "surecart/lightbox" }'
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'sc-lightbox-container' ] ) ); ?>
	<?php
	echo wp_kses_data(
		wp_interactivity_data_wp_context(
			[
				'imageId' => $media->id, // this is needed for the lightbox to work.
			]
		)
	);
	?>
>
	<?php
	echo wp_kses(
		$media->withLightbox( $lightbox )->html(
			'large',
			array(
				'loading' => $loading ?? 'eager',
				'style'   => $style ?? '',
			)
		),
		sc_allowed_svg_html()
	);
	?>
</figure>
