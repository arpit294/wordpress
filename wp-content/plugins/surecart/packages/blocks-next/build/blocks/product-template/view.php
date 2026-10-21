<?php
// we have no posts.

use SureCart\Models\Blocks\ProductPageBlock;

if ( ! $query->have_posts() ) {
	return '';
}
?>

<ul <?php echo wp_kses_data( get_block_wrapper_attributes( $wrapper_attributes ) ); ?>>
	<?php
	while ( $query->have_posts() ) :
		$query->the_post();

		// Get an instance of the current Post Template block.
		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		$product_post_id      = get_the_ID();
		$product_post_type    = get_post_type();
		$filter_block_context = static function ( $context ) use ( $product_post_id, $product_post_type ) {
			$context['postType'] = $product_post_type;
			$context['postId']   = $product_post_id;
			return $context;
		};

		$change_thumbnail_size = static function ( $size, $post_id ) use ( $product_post_id ) {
			if ( $post_id === $product_post_id ) {
				return apply_filters( 'surecart/product-list/thumbnail-cover-size', 'large', $post_id );
			}
			return $size;
		};

		// Use an early priority to so that other 'render_block_context' filters have access to the values.
		add_filter( 'render_block_context', $filter_block_context, 1 );
		add_filter( 'post_thumbnail_size', $change_thumbnail_size, 1, 2 );

		// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
		// `render_callback` and ensure that no wrapper markup is included.
		$block_content = ( new WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );

		// Real controls can't be wrapped in the product link, so those cards get a stretched
		// overlay link instead.
		$has_controls = sc_has_interactive_content( $block_content );

		remove_filter( 'render_block_context', $filter_block_context, 1 );
		remove_filter( 'post_thumbnail_size', $change_thumbnail_size, 1 );

		// Wrap the render inner blocks in a `li` element with the appropriate post classes.
		$post_classes = implode( ' ', get_post_class( 'wp-block-post' ) );

		$controller = new ProductPageBlock();
		$state      = $controller->state();
		// Every card shares the page URL, so no card may write its variant selection to it.
		$context = $controller->context( array( 'updateUrl' => false ) );

		wp_interactivity_state( 'surecart/product-page', $state );
		?>

		<li class="<?php echo esc_attr( 'sc-product-item sc-has-animation-fade-up' . ( $has_controls ? ' sc-product-item--has-controls' : '' ) ); ?>" data-wp-key="post-template-item-<?php echo (int) $product_post_id; ?>">
			<form
				data-wp-interactive='{ "namespace": "surecart/product-page" }'
				data-wp-on--submit="callbacks.handleSubmit"
				data-wp-init="callbacks.init"
				<?php
					echo wp_kses_data( wp_interactivity_data_wp_context( $context ) );
				?>
				>
				<?php if ( $has_controls ) : ?>
					<?php echo $block_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php // Link last, so it wins the z-index tie against a cover block's inner container. ?>
					<a class="sc-product-item-link" href="<?php echo esc_url( get_the_permalink() ); ?>" aria-label="<?php echo esc_attr( get_the_title() ); ?>"></a>
				<?php else : ?>
					<a class="sc-product-item-link" href="<?php echo esc_url( get_the_permalink() ); ?>">
						<?php echo $block_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</a>
				<?php endif; ?>
			</form>
		</li>
	<?php endwhile; ?>
</ul>

<?php wp_reset_postdata(); ?>
