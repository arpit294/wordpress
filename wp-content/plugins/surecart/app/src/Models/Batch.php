<?php

namespace SureCart\Models;

use SureCart\Models\Traits\HasDates;

/**
 * Batch model.
 *
 * Pass-through to the SureCart batch API (`/batches`). A batch wraps many
 * `batch_operations`, each of which is executed independently on the platform.
 *
 * @see https://developer.surecart.com/api-reference/batches/create
 */
class Batch extends Model {
	use HasDates;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'batches';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'batch';
}
