<?php

namespace SureCart\Controllers\Admin\Customers;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Customers Page
 */
class CustomersScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies', 'i18n', 'google_map_api_key' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/customers';

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
