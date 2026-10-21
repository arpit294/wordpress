<?php

namespace SureCart\Controllers\Admin\Forms;

use SureCart\Models\Form;
use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Checkout Forms list page scripts.
 */
class FormsScriptsController extends AdminModelEditController {
	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/forms';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = self::UNIFIED_SPA_PATH;

	/**
	 * Opt into the dataviews stylesheet enqueue (handled by the parent).
	 *
	 * @var bool
	 */
	protected $needs_dataviews_style = true;

	/**
	 * Add the form-specific data the list needs.
	 */
	public function __construct() {
		$this->data['forms'] = [
			'new_url'           => admin_url( 'post-new.php?post_type=sc_form' ),
			'can_duplicate'     => Form::canCreate(),
			'store_checkout_id' => (int) ( \SureCart::forms()->getDefaultId() ?? 0 ),
		];
	}
}
