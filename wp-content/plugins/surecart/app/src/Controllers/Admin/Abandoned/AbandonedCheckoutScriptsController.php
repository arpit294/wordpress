<?php

namespace SureCart\Controllers\Admin\Abandoned;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Enqueues the abandoned checkouts admin app scripts.
 */
class AbandonedCheckoutScriptsController extends AdminModelEditController {
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
	protected $handle = 'surecart/scripts/admin/abandoned_checkout';

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

}
