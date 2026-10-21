<?php

namespace SureCart\Controllers\Admin\Orders;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Shipping Labels bulk page scripts.
 */
class ShippingLabelsScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies', 'links', 'shipping_protocol', 'i18n' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/shipping-labels';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = self::UNIFIED_SPA_PATH;

	/**
	 * Opt into the dataviews stylesheet enqueue.
	 *
	 * @var bool
	 */
	protected $needs_dataviews_style = true;
}
