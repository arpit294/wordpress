<?php

namespace SureCartBlocks\Blocks\TrialLineItem;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Trial Line Item block class
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
		$label              = $attributes['label'] ?? __( 'Trial', 'surecart' );
		$wrapper_attributes = get_block_wrapper_attributes( [ 'label' => esc_attr( $label ) ] );

		return wp_sprintf(
			'<sc-line-item-trial %s></sc-line-item-trial>',
			$wrapper_attributes,
		);
	}
}
