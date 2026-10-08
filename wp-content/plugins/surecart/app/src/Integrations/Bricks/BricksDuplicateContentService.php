<?php

namespace SureCart\Integrations\Bricks;

/**
 * Controls Bricks' "duplicate content" feature on SureCart post types.
 */
class BricksDuplicateContentService {
	/**
	 * Bootstrap the service.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter( 'bricks/use_duplicate_content', [ $this, 'disableForCheckoutForms' ], 10, 2 );
	}

	/**
	 * Hide Bricks' duplicate row action on checkout forms — they are Gutenberg
	 * content (no Bricks data) and already have a SureCart-aware Duplicate action.
	 *
	 * @param bool    $use     Whether Bricks shows its duplicate action.
	 * @param integer $post_id Current post id.
	 *
	 * @return bool
	 */
	public function disableForCheckoutForms( $use, $post_id ) {
		return \SureCart::forms()->getPostType() === get_post_type( $post_id ) ? false : $use;
	}
}
