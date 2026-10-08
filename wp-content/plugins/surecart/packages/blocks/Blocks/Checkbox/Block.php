<?php

namespace SureCartBlocks\Blocks\Checkbox;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Checkbox input block.
 */
class Block extends BaseBlock {
	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		// RichText can't tell a cleared field from an unset one, so blank falls back too.
		$label = ! empty( $attributes['label'] ) ? $attributes['label'] : __( 'Checkbox', 'surecart' );
		ob_start();
		?>
		<sc-checkbox
			<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
			name="<?php echo esc_attr( $attributes['name'] ?? '' ); ?>"
			value="<?php echo esc_attr( $attributes['value'] ?? '' ); ?>"
			<?php echo ! empty( $attributes['checked'] ) ? 'checked' : ''; ?>
			<?php echo ! empty( $attributes['required'] ) ? 'required' : ''; ?>
		><?php echo wp_kses_post( $label ); ?></sc-checkbox>
		<?php
		return ob_get_clean();
	}
}
