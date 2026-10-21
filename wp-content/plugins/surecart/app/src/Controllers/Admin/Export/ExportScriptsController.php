<?php

namespace SureCart\Controllers\Admin\Export;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Enqueues the shared export screen bundle.
 */
class ExportScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add to the page.
	 *
	 * @var array
	 */
	protected $with_data = [];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/export';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = 'admin/export';
}
