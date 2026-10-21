<?php

namespace SureCartBlocks\Blocks\SessionDetail;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Session detail block.
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
			[ 'label' => [ 'label', __( 'Customer Name', 'surecart' ) ] ]
		);
	}
}
