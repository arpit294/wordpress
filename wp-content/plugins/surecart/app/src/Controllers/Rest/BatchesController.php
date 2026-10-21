<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\ReadsBatchOperations;
use SureCart\Models\Batch;

/**
 * Handle Batch API requests through the REST proxy.
 */
class BatchesController extends RestController {
	use ReadsBatchOperations;

	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Batch::class;

	/**
	 * Resource slug for the dynamic list filter hooks.
	 *
	 * @var string
	 */
	protected $resource = 'batches';

	/**
	 * Create a batch, stamping the caller as its owner.
	 *
	 * Model::create() stamps `wp_created_by` by writing to `$this->metadata`,
	 * but getMetadataAttribute() casts a fresh object out of the raw attribute
	 * on every read, so that write is thrown away unless `metadata` was already
	 * set — and no batch caller sends one. Put the stamp in the payload instead,
	 * because {@see find()} is what gates on it.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Batch|\WP_Error
	 */
	public function create( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		$params             = (array) $request->get_json_params();
		$params['metadata'] = array_merge(
			(array) ( $params['metadata'] ?? [] ),
			[ 'wp_created_by' => get_current_user_id() ]
		);

		return $model->where( $this->forwardableQueryParams( $request ) )->create( $params );
	}

	/**
	 * List batches, redacting operations the caller may not read.
	 *
	 * There is no ownership filter here — the route's capability gate plus the
	 * per-operation redaction is what keeps another user's batch from carrying
	 * anything sensitive, and `wp_created_by` is already stripped from non-edit
	 * responses.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function index( \WP_REST_Request $request ) {
		$response = parent::index( $request );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response->set_data( array_map( [ $this, 'redactBatchOperations' ], (array) $response->get_data() ) );

		return $response;
	}

	/**
	 * Find a batch, refusing one another user created.
	 *
	 * A batch response carries every sub-operation's body, which can include
	 * customer PII, so the route's coarse capability gate is not enough.
	 * Checked here rather than in the permission callback so the poll loop
	 * costs one platform fetch, not two. Batches with no `wp_created_by` stamp
	 * are let through — they predate {@see create()} stamping them — so the
	 * operations are redacted either way.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Batch|\WP_Error
	 */
	public function find( \WP_REST_Request $request ) {
		$batch = parent::find( $request );
		if ( is_wp_error( $batch ) ) {
			return $batch;
		}

		$created_by = (int) $batch->created_by;
		if ( $created_by && get_current_user_id() !== $created_by ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You can only access batches you created.', 'surecart' ),
				[ 'status' => 403 ]
			);
		}

		return $this->redactBatchOperations( $batch );
	}

	/**
	 * Drop the embedded operations the caller may not read.
	 *
	 * `batch_operations` is absent unless the caller expanded it, and arrives
	 * either as a plain list or wrapped in the platform's
	 * `{ data, pagination }` collection envelope.
	 *
	 * @param mixed $batch Batch model from the platform response.
	 *
	 * @return mixed The batch, with unreadable operations removed.
	 */
	protected function redactBatchOperations( $batch ) {
		if ( ! is_a( $batch, Batch::class ) ) {
			return $batch;
		}

		$operations = $batch->batch_operations;
		if ( empty( $operations ) ) {
			return $batch;
		}

		if ( is_object( $operations ) && isset( $operations->data ) ) {
			$operations->data        = $this->readableOperations( (array) $operations->data );
			$batch->batch_operations = $operations;
		} elseif ( is_array( $operations ) && isset( $operations['data'] ) && is_array( $operations['data'] ) ) {
			$operations['data']      = $this->readableOperations( $operations['data'] );
			$batch->batch_operations = $operations;
		} elseif ( is_array( $operations ) ) {
			$batch->batch_operations = $this->readableOperations( $operations );
		}

		return $batch;
	}

	/**
	 * Keep only the operations the caller may read.
	 *
	 * A scalar entry is an id from an unexpanded list, which holds nothing to
	 * redact, so it stays.
	 *
	 * @param array $operations Batch operations.
	 *
	 * @return array
	 */
	protected function readableOperations( array $operations ): array {
		return array_values(
			array_filter(
				$operations,
				function ( $operation ) {
					if ( ! is_array( $operation ) && ! is_object( $operation ) ) {
						return true;
					}
					return $this->currentUserCanReadOperation( $operation );
				}
			)
		);
	}
}
