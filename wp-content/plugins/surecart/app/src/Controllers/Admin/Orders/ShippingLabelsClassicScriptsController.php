<?php

namespace SureCart\Controllers\Admin\Orders;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Scripts for the classic Shipping Labels view — the React island that
 * mounts on `#sc-shipping-labels-bulk-drawer`.
 */
class ShippingLabelsClassicScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add to the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies', 'links', 'shipping_protocol', 'i18n' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/shipping-labels-classic';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = 'admin/shipping-labels-classic';

	/**
	 * Opt into the dataviews stylesheet enqueue.
	 *
	 * @var bool
	 */
	protected $needs_dataviews_style = true;
}
