<?php

namespace SureCart\Controllers\Admin\CancellationInsights;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Cancellation Insights (cancellation acts) list page scripts.
 */
class CancellationInsightsScriptsController extends AdminModelEditController {
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
	protected $handle = 'surecart/scripts/admin/cancellations';

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
