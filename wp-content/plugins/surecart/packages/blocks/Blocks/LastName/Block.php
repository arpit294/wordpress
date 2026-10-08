<?php

namespace SureCartBlocks\Blocks\LastName;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Customer last name field block.
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
			[ 'label' => [ 'label', __( 'Last Name', 'surecart' ) ] ]
		);
	}
}
