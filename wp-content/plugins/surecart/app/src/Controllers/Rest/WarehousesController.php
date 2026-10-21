<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Warehouse;

/**
 * Handle Warehouse requests through the REST API
 */
class WarehousesController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Warehouse::class;
}
