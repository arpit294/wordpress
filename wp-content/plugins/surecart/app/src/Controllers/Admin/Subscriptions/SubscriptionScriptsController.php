<?php

namespace SureCart\Controllers\Admin\Subscriptions;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Enqueues the subscriptions admin app scripts.
 */
class SubscriptionScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'tax_protocol', 'supported_currencies' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/subscription';

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
