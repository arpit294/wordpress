<?php

namespace SureCartBlocks\Blocks\Coupon;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Checkout block
 */
class Block extends BaseBlock {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		ob_start();
		?>
		<sc-order-coupon-form
			label="<?php echo esc_attr( ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Add Coupon Code', 'surecart' ) ); ?>"
			placeholder="<?php echo esc_attr( ! empty( $attributes['placeholder'] ) ? $attributes['placeholder'] : __( 'Enter coupon code', 'surecart' ) ); ?>"
			button-text="<?php echo esc_attr( ! empty( $attributes['button_text'] ) ? $attributes['button_text'] : __( 'Apply', 'surecart' ) ); ?>"
			<?php echo ! empty( $attributes['collapsed'] ) || ! isset( $attributes['collapsed'] ) ? 'collapsed' : ''; ?>>
		</sc-order-coupon-form>
		<?php
		return ob_get_clean();
	}
}
