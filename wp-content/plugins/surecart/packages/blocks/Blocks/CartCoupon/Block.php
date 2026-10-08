<?php

namespace SureCartBlocks\Blocks\CartCoupon;

use SureCartBlocks\Blocks\CartBlock;

/**
 * Checkout block
 */
class Block extends CartBlock {
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
			class="<?php echo esc_attr( $attributes['className'] ?? '' ); ?>"
			style="<?php echo esc_attr( $this->getStyle( $attributes ) ); ?>"
			<?php echo ! empty( $attributes['collapsed'] ) || ! isset( $attributes['collapsed'] ) ? 'collapsed' : ''; ?>>
			<?php echo wp_kses_post( ! empty( $attributes['button_text'] ) ? $attributes['button_text'] : __( 'Apply', 'surecart' ) ); ?>
		</sc-order-coupon-form>
		<?php
		return ob_get_clean();
	}
}
