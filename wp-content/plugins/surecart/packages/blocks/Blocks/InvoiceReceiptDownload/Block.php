<?php

namespace SureCartBlocks\Blocks\InvoiceReceiptDownload;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Invoice receipt download line item.
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
		$text = ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Receipt', 'surecart' );
		ob_start();
		?>
		<sc-line-item-invoice-receipt-download <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
			<span slot="title"><?php echo esc_html( $text ); ?></span>
		</sc-line-item-invoice-receipt-download>
		<?php
		return ob_get_clean();
	}
}
