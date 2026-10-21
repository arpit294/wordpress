<?php

namespace SureCartBlocks\Blocks\InvoiceNumber;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Invoice number line item.
 */
class Block extends BaseBlock {
	/**
	 * Render with a translated fallback; the saved markup holds an English literal.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		$text = ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Invoice Number', 'surecart' );
		ob_start();
		?>
		<sc-line-item-invoice-number <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
			<span slot="title"><?php echo esc_html( $text ); ?></span>
		</sc-line-item-invoice-number>
		<?php
		return ob_get_clean();
	}
}
