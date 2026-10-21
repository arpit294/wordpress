<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\BatchOperationsController;

/**
 * Batch operations REST service provider.
 *
 * Extends the batches provider to reuse its coarse read gate — anyone who may
 * read batches may read their operations. Read-only: operations are created
 * through POST /batches, never directly.
 */
class BatchOperationsRestServiceProvider extends BatchesRestServiceProvider {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'batch_operations';

	/**
	 * Rest Controller.
	 *
	 * @var string
	 */
	protected $controller = BatchOperationsController::class;

	/**
	 * Operations are read via list (filtered by `batch_ids[]`) to learn
	 * per-row outcomes of a finished batch.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'find' ];

	/**
	 * Schema callback.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			return $this->schema;
		}

		$this->schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => $this->endpoint,
			'type'       => 'object',
			'properties' => [
				'id'              => [
					'description' => __( 'UUID of the batch operation.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
				'status'          => [
					'description' => __( 'pending | in_progress | completed | failed | timed_out', 'surecart' ),
					'type'        => 'string',
					'readonly'    => true,
				],
				'response_status' => [
					'description' => __( 'HTTP status code returned by this operation.', 'surecart' ),
					'type'        => 'integer',
					'readonly'    => true,
				],
			],
		];

		return $this->schema;
	}

	/**
	 * Collection params.
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array_merge(
			parent::get_collection_params(),
			[
				'batch_ids' => [
					'description' => __( 'Only return operations that belong to the given batches.', 'surecart' ),
					'type'        => 'array',
					'items'       => [ 'type' => 'string' ],
				],
				'status'    => [
					'description' => __( 'Only return operations with the given statuses.', 'surecart' ),
					'type'        => 'array',
					'items'       => [ 'type' => 'string' ],
				],
			]
		);
	}
}
