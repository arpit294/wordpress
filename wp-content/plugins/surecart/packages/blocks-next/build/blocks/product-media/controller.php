<?php

$product = sc_get_product();

$gallery = $product->gallery ?? [];
$media   = $gallery[0] ?? null;

// get the width.
$width = false;
if ( ! empty( $attributes['width'] ) ) {
	$width = is_numeric( $attributes['width'] ) ? $attributes['width'] . 'px' : $attributes['width'];
}

// handle empty.
if ( empty( $gallery ) ) {
	return ! empty( $attributes['hide_empty'] ) ? '' : 'file:./empty.php';
}

if ( ! empty( $attributes['lightbox'] ) ) {
	wp_enqueue_style( 'surecart-lightbox' );
	wp_enqueue_script_module( 'surecart/lightbox' );
}

// Don't enqueue video script if there is no video in the gallery.
if ( $product->has_videos ) {
	wp_enqueue_script_module( '@surecart/video' );
	wp_enqueue_style( 'surecart-video' );
}

$auto_height = ! empty( $attributes['desktop_gallery'] ) ? true : ! empty( $attributes['auto_height'] ) && $attributes['auto_height'];

// handle image.
if ( count( $gallery ) === 1 ) {
	$style = ! empty( $width ) ? 'max-width: min(' . esc_attr( $width ) . ', 100%);' : '';
	return $media->isVideo() ? 'file:./video.php' : 'file:./image.php';
}

// only enqueue if we are needing a slideshow.
wp_enqueue_style( 'surecart-image-slider' );
wp_enqueue_script_module( '@surecart/image-slider' );

// the slide visibility directives use the surecart/product-page store, which no ancestor enqueues when this renders standalone (e.g. via shortcode). Idempotent on product pages.
wp_enqueue_script_module( '@surecart/product-page' );

// shortcode attributes are strings — Swiper needs an int for slidesPerView/slidesPerGroup.
$thumbnails_per_page = (int) ( $attributes['thumbnails_per_page'] ?? 5 );

// handle slideshow.
$slider_options = array(
	'activeBreakpoint'   => apply_filters( 'surecart/image-slider/active-breakpoint', $attributes['desktop_gallery'] ? 782 : false ),
	'sliderOptions'      => array(
		'autoHeight'   => $auto_height,
		'spaceBetween' => 40,
	),
	'thumbSliderOptions' => array(
		'slidesPerView'  => $thumbnails_per_page,
		'slidesPerGroup' => $thumbnails_per_page,
		'breakpoints'    => array(
			320 => array(
				'slidesPerView'  => $thumbnails_per_page,
				'slidesPerGroup' => $thumbnails_per_page,
			),
		),
	),
);

$height = 'auto';
if ( ! $auto_height && ! empty( $attributes['height'] ) ) {
	$height = $attributes['height'];
}

// `width` caps the whole slideshow, not just each slide, or the thumb strip stays full width.
// Centered here because the slideshow root has no block wrapper class (its img/text-align rules would hit the slider).
$wrapper_style = ! empty( $width ) ? 'max-width: min(' . $width . ', 100%); margin-left: auto; margin-right: auto;' : '';

wp_interactivity_state(
	'surecart/image-slider',
	array(
		'active' => true, // to prevent flash of unstyled content.
	)
);

return 'file:./slideshow.php';
