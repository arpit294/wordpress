<?php
// The composed (page) layout saves an inner product-variant-pill block.
// The bundle component layout reuses this picker without composed inner blocks,
// so synthesize a default pill so the markup/JS stay identical in both scopes.
$has_saved_inner = ! empty( $block->parsed_block['innerBlocks'] );

$inner_blocks = $has_saved_inner
	? $block->parsed_block['innerBlocks']
	: array(
		array(
			'blockName'    => 'surecart/product-variant-pill',
			'attrs'        => array(),
			'innerBlocks'  => array(),
			'innerHTML'    => '',
			'innerContent' => array(),
		),
	);

$inner_content = $has_saved_inner
	? ( $block->parsed_block['innerContent'] ?? array( null ) )
	: array( null );

// Get highlight styles from the inner product-variant-pill block.
$pill_block       = wp_get_first_block( $inner_blocks, 'surecart/product-variant-pill' );
$pill_block_attrs = $pill_block['attrs'] ?? array();
?>

<label class="<?php echo esc_attr( $label_class ); ?>">
	<?php echo wp_kses_post( $pill_group_label ?? $option->name ); ?>
</label>

<?php
// A plain wrapper on purpose — get_block_wrapper_attributes() here would re-apply
// the block's supports (margins, anchor, colors) already printed on the row
// wrapper, doubling the spacing between option rows.
$pill_wrapper_style = sc_get_inline_styles(
	array_filter(
		[
			'--sc-pill-option-active-background-color' => $pill_block_attrs['highlight_background'] ?? '',
			'--sc-pill-option-active-text-color'       => $pill_block_attrs['highlight_text'] ?? '',
			'--sc-pill-option-active-border-color'     => $pill_block_attrs['highlight_border'] ?? '',
		]
	)
);
?>
<div class="sc-pill-option__wrapper"<?php echo $pill_wrapper_style ? ' style="' . esc_attr( $pill_wrapper_style ) . '"' : ''; ?>>
	<?php
	$pills = array();

	foreach ( $option->values as $value ) :
		// Get an instance of the current Post Template block.
		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName']    = 'core/null';
		$block_instance['innerBlocks']  = $inner_blocks;
		$block_instance['innerContent'] = $inner_content;

		$filter_block_context = static function ( $context ) use ( $value, $option ) {
			$context['value'] = $value;
			$context['name']  = $option->name;
			return $context;
		};

		// Use an early priority to so that other 'render_block_context' filters have access to the values.
		add_filter( 'render_block_context', $filter_block_context, 1 );
		// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
		// `render_callback` and ensure that no wrapper markup is included.
		$pills[] = ( new WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );
		remove_filter( 'render_block_context', $filter_block_context, 1 );
	endforeach;

	// Compact layouts (a product card in a list) can cap how many pills show per
	// option row; the rest stay in the DOM behind a "+N more" toggle so selection
	// logic and accessibility are unaffected. 0 means show everything.
	$max_visible    = max( 0, (int) ( $attributes['max_visible_options'] ?? 0 ) );
	$overflow_count = sc_variant_pills_overflow_count( count( $pills ), $max_visible );

	$visible_pills  = $overflow_count ? array_slice( $pills, 0, $max_visible ) : $pills;
	$overflow_pills = $overflow_count ? array_slice( $pills, $max_visible ) : array();

	echo implode( '', $visible_pills ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>

	<?php if ( $overflow_count ) : ?>
		<?php
		static $overflow_id = 0;
		++$overflow_id;
		$overflow_dom_id = 'sc-pill-overflow-' . $overflow_id;
		?>
		<div
			class="sc-pill-option__overflow-scope"
			<?php echo wp_kses_data( wp_interactivity_data_wp_context( array( 'showAllOptions' => false ) ) ); ?>
		>
			<div
				id="<?php echo esc_attr( $overflow_dom_id ); ?>"
				class="sc-pill-option__overflow"
				hidden
				data-wp-bind--hidden="!context.showAllOptions"
			>
				<?php echo implode( '', $overflow_pills ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<?php
			// Mirror the pill block's styles (font size, padding, border) so the
			// toggle looks like just another pill in the row.
			$more_style = wp_style_engine_get_styles( $pill_block_attrs['style'] ?? array() )['css'] ?? '';
			?>
			<button
				type="button"
				class="sc-pill-option__button sc-pill-option__more"
				<?php echo $more_style ? ' style="' . esc_attr( $more_style ) . '"' : ''; ?>
				data-wp-on--click="callbacks.showAllOptions"
				data-wp-bind--hidden="context.showAllOptions"
				data-wp-bind--aria-expanded="context.showAllOptions"
				aria-controls="<?php echo esc_attr( $overflow_dom_id ); ?>"
				aria-expanded="false"
			>
				<?php
				echo esc_html(
					sprintf(
						/* translators: %d: number of additional variant options revealed on click. */
						__( '+%d more', 'surecart' ),
						$overflow_count
					)
				);
				?>
			</button>
		</div>
	<?php endif; ?>
</div>
