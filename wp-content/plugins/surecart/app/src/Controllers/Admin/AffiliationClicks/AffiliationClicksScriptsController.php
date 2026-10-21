<?php

namespace SureCart\Controllers\Admin\AffiliationClicks;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Affiliate clicks list page scripts.
 */
class AffiliationClicksScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add to the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/affiliation-clicks';

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
