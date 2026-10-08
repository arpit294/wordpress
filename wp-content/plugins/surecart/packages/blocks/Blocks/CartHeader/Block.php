<?php

namespace SureCartBlocks\Blocks\CartHeader;

use SureCartBlocks\Blocks\CartBlock;

/**
 * Cart Header block.
 */
class Block extends CartBlock {
	/**
	 * Render cart header block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		// RichText can't tell a cleared field from an unset one, so blank falls back too.
		$text = ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Cart', 'surecart' );
		ob_start();
		?>
		<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'style' => $this->getStyle( $attributes ) ] ) ); ?>>
			<sc-cart-header>
				<span><?php echo wp_kses_post( $text ); ?></span>
			</sc-cart-header>
		</div>
		<?php
		return ob_get_clean();
	}
}
