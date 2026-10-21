<?php

namespace SureCartBlocks\Blocks\ShippingChoices;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Shipping choices block.
 */
class Block extends BaseBlock {
	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Inner blocks rendered HTML (unused).
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		$show_control     = ! isset( $attributes['showControl'] ) || ! empty( $attributes['showControl'] );
		$show_description = ! isset( $attributes['showDescription'] ) || ! empty( $attributes['showDescription'] );
		$label            = $attributes['label'] ?? __( 'Shipping', 'surecart' );

		ob_start();
		?>
		<sc-shipping-choices
			show-control="<?php echo $show_control ? 'true' : 'false'; ?>"
			show-description="<?php echo $show_description ? 'true' : 'false'; ?>"
			label="<?php echo esc_attr( $label ); ?>"
			<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
		></sc-shipping-choices>
		<?php
		return ob_get_clean();
	}
}
