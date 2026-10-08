<?php

namespace SureCart\Models;

use SureCart\Models\Traits\HasDates;

/**
 * Warehouse model.
 */
class Warehouse extends Model {
	use HasDates;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'warehouses';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'warehouse';
}
