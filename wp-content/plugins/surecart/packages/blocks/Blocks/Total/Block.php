<?php

namespace SureCartBlocks\Blocks\Total;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Total line item block.
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
		$text                     = ! empty( $attributes['text'] ) ? $attributes['text'] : __( 'Total', 'surecart' );
		$subscription_text        = ! empty( $attributes['subscription_text'] ) ? $attributes['subscription_text'] : __( 'Total Due Today', 'surecart' );
		$first_payment_total_text = ! empty( $attributes['first_payment_total_text'] ) ? $attributes['first_payment_total_text'] : __( 'Subtotal', 'surecart' );
		$free_trial_text          = ! empty( $attributes['free_trial_text'] ) ? $attributes['free_trial_text'] : __( 'Trial', 'surecart' );
		$due_amount_text          = ! empty( $attributes['due_amount_text'] ) ? $attributes['due_amount_text'] : __( 'Amount Due', 'surecart' );

		ob_start();
		?>
		<sc-line-item-total
			<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
			total="total"
			size="large"
			show-currency="1"
		>
			<span slot="title"><?php echo esc_html( $text ); ?></span>
			<span slot="subscription-title"><?php echo esc_html( $subscription_text ); ?></span>
			<span slot="first-payment-total-description"><?php echo esc_html( $first_payment_total_text ); ?></span>
			<span slot="free-trial-description"><?php echo esc_html( $free_trial_text ); ?></span>
			<span slot="due-amount-description"><?php echo esc_html( $due_amount_text ); ?></span>
		</sc-line-item-total>
		<?php
		return ob_get_clean();
	}
}
