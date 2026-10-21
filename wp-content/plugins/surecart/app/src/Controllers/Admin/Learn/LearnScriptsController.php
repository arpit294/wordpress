<?php

namespace SureCart\Controllers\Admin\Learn;

use SureCart\Models\Processor;
use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Learn page scripts — boots the unified admin app with the learn boot
 * data on top of the shared unified payload.
 */
class LearnScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/learn';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = self::UNIFIED_SPA_PATH;

	/**
	 * Boot data the learn screen reads beyond the shared unified payload.
	 *
	 * Includes `processors` (a platform API call), so it is localized only on
	 * the learn boot and served from the learn boot REST endpoint when the
	 * unified shell swaps the screen in client-side — never on every page.
	 *
	 * @return array
	 */
	public static function bootData() {
		return [
			'processors'              => Processor::get(),
			'brand_logo_url'          => \SureCart::account()->brand->logo_url ?? null,
			'brand_color'             => \SureCart::account()->brand->color ?? null,
			'shop_page_edit_url'      => \SureCart::pages()->getId( 'shop' )
				? admin_url( 'post.php?post=' . \SureCart::pages()->getId( 'shop' ) . '&action=edit' )
				: '',
			'dashboard_page_edit_url' => \SureCart::pages()->getId( 'dashboard' )
				? admin_url( 'post.php?post=' . \SureCart::pages()->getId( 'dashboard' ) . '&action=edit' )
				: '',
		];
	}

	/**
	 * Enqueue scripts with additional learn-specific data.
	 *
	 * @return void
	 */
	public function enqueue() {
		$this->data = array_merge( $this->data, self::bootData() );
		parent::enqueue();
	}
}
