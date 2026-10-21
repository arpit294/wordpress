<?php

namespace SureCartBlocks\Blocks\TaxIdInput;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * VAT / Tax ID input block.
 */
class Block extends BaseBlock {
	/**
	 * Add translated labels for any the author left unset.
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
			[
				'other_label'  => [ 'other-label', __( 'Tax ID', 'surecart' ) ],
				'ca_gst_label' => [ 'ca-gst-label', __( 'GST Number', 'surecart' ) ],
				'au_abn_label' => [ 'au-abn-label', __( 'ABN Number', 'surecart' ) ],
				'gb_vat_label' => [ 'gb-vat-label', __( 'UK VAT', 'surecart' ) ],
				'eu_vat_label' => [ 'eu-vat-label', __( 'EU VAT', 'surecart' ) ],
			]
		);
	}
}
