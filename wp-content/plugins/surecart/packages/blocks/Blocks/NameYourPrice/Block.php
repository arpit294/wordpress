<?php

namespace SureCartBlocks\Blocks\NameYourPrice;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Name-your-own-price input block.
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
			[ 'label' => [ 'label', __( 'Enter An Amount', 'surecart' ) ] ]
		);
	}
}
