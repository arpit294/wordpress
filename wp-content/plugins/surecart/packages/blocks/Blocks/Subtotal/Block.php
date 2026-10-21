<?php

namespace SureCartBlocks\Blocks\Subtotal;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Subtotal line item block.
 */
class Block extends BaseBlock {
	/**
	 * Render with translated fallbacks; the saved markup holds English literals.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		$text                        = ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Subtotal', 'surecart' );
		$total_payments_text         = ! empty( $attributes['total_payments_text'] ) ? $attributes['total_payments_text'] : __( 'Total Installments', 'surecart' );
		$first_payment_subtotal_text = ! empty( $attributes['first_payment_subtotal_text'] ) ? $attributes['first_payment_subtotal_text'] : __( 'Initial Payment', 'surecart' );

		ob_start();
		?>
		<sc-line-item-total <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> total="subtotal">
			<span slot="description"><?php echo esc_html( $text ); ?></span>
			<span slot="total-payments-description"><?php echo esc_html( $total_payments_text ); ?></span>
			<span slot="first-payment-subtotal-description"><?php echo esc_html( $first_payment_subtotal_text ); ?></span>
		</sc-line-item-total>
		<?php
		return ob_get_clean();
	}
}
