<?php

namespace SureCartBlocks\Blocks\InvoiceMemo;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Invoice memo block.
 */
class Block extends BaseBlock {
	/**
	 * Translate the default text baked into the saved markup.
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
			[ 'text' => [ 'text', __( 'Memo', 'surecart' ) ] ]
		);
	}
}
