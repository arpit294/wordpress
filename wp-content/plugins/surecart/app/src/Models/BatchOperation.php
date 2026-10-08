<?php

namespace SureCart\Models;

/**
 * Batch operation model.
 */
class BatchOperation extends Model {
	/**
	 * Rest API endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'batch_operations';

	/**
	 * Object name.
	 *
	 * @var string
	 */
	protected $object_name = 'batch_operation';
}
