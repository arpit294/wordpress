<?php

namespace SureCartBlocks\Blocks\ExpressPayment;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Express payment (Apple Pay / Google Pay) block.
 */
class Block extends BaseBlock {
	/**
	 * Translate the default divider text baked into the saved markup.
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
			[ 'divider_text' => [ 'divider-text', __( 'or', 'surecart' ) ] ]
		);
	}
}
