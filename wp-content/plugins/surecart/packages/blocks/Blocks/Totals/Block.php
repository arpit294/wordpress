<?php

namespace SureCartBlocks\Blocks\Totals;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Totals (order summary) block.
 */
class Block extends BaseBlock {
	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Inner blocks rendered HTML.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		$collapsible          = ! empty( $attributes['collapsible'] );
		$collapsed_on_desktop = ! empty( $attributes['collapsedOnDesktop'] );
		$collapsed_on_mobile  = ! empty( $attributes['collapsedOnMobile'] );
		$order_summary_text   = $attributes['order_summary_text'] ?? __( 'Summary', 'surecart' );
		$invoice_summary_text = $attributes['invoice_summary_text'] ?? __( 'Invoice Summary', 'surecart' );

		// Strip the legacy <sc-order-summary> wrapper from $content if it's there.
		$content = $this->stripLegacyWrapper( $content );

		ob_start();
		?>
		<sc-order-summary
			<?php echo $collapsible ? 'collapsible="1"' : ''; ?>
			<?php echo $collapsed_on_desktop ? 'collapsed-on-desktop="1"' : ''; ?>
			<?php echo $collapsed_on_mobile ? 'collapsed-on-mobile="1"' : ''; ?>
			order-summary-text="<?php echo esc_attr( $order_summary_text ); ?>"
			invoice-summary-text="<?php echo esc_attr( $invoice_summary_text ); ?>"
			<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
		>
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Already escaped block content. ?>
		</sc-order-summary>
		<?php
		return ob_get_clean();
	}

	/**
	 * Strip a single legacy <sc-order-summary>…</sc-order-summary> wrapper if it
	 * surrounds the inner-block HTML.
	 *
	 * Only the outermost matching pair is removed and only when it cleanly wraps
	 * everything (with optional surrounding whitespace), so blocks that happen
	 * to contain a legitimate inner <sc-order-summary> are left alone.
	 *
	 * @param string $content Inner blocks rendered HTML, possibly with a legacy
	 *                       static-save wrapper around it.
	 *
	 * @return string
	 */
	protected function stripLegacyWrapper( $content ) {
		if ( '' === trim( (string) $content ) ) {
			return $content;
		}

		$pattern = '/^\s*<sc-order-summary\b[^>]*>(.*)<\/sc-order-summary>\s*$/s';
		if ( preg_match( $pattern, $content, $matches ) ) {
			return $matches[1];
		}

		return $content;
	}
}
