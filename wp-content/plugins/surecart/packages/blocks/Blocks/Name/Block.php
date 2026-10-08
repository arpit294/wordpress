<?php

namespace SureCartBlocks\Blocks\Name;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Name (customer full name) block.
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
			[ 'label' => [ 'label', __( 'Name', 'surecart' ) ] ]
		);
	}
}
