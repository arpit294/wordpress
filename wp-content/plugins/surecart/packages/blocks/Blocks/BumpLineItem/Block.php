<?php

namespace SureCartBlocks\Blocks\BumpLineItem;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Bump line item block.
 */
class Block extends BaseBlock {
	/**
	 * Translate the default label baked into the saved markup.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		return $this->withTranslatedDefaults(
			$content,
			$attributes,
			[ 'label' => [ 'label', __( 'Bundle Discount', 'surecart' ) ] ]
		);
	}
}
