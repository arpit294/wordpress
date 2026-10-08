<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\ReadsBatchOperations;
use SureCart\Models\BatchOperation;

/**
 * Handle Batch Operation read requests through the REST proxy.
 *
 * Read-only companion to BatchesController — the batch object itself never
 * reports failures (its status is only pending/in_progress/completed), so
 * callers list the operations of a finished batch to learn per-row outcomes.
 */
class BatchOperationsController extends RestController {
	use ReadsBatchOperations;

	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = BatchOperation::class;

	/**
	 * Resource slug for the dynamic list filter hooks.
	 *
	 * @var string
	 */
	protected $resource = 'batch_operations';

	/**
	 * List batch operations, scoped to what the caller may read.
	 *
	 * The route's permission check is a coarse "may use batches at all" gate,
	 * so without this a user with e.g. only `edit_sc_products` could read the
	 * outcomes of batches that ran against customers or orders. Each operation
	 * is gated by the same capability creating it required; operations the
	 * caller couldn't have created are dropped rather than 403ing the request,
	 * because the platform may return operations from other batches.
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

		$operations = (array) $response->get_data();
		$visible    = array_values( array_filter( $operations, [ $this, 'currentUserCanReadOperation' ] ) );

		// parent::index() already set X-WP-Total/X-WP-TotalPages from the
		// unfiltered platform count. Shrink them by however many operations
		// this page hid, so the pagination footer stays consistent with the
		// rows actually returned (best-effort — the platform total may still
		// include hidden operations on other pages).
		$hidden = count( $operations ) - count( $visible );
		if ( $hidden ) {
			$headers  = $response->get_headers();
			$total    = max( 0, (int) ( $headers['X-WP-Total'] ?? 0 ) - $hidden );
			$per_page = (int) $request->get_param( 'per_page' ) ?: max( 1, count( $operations ) );
			$response->header( 'X-WP-Total', $total );
			$response->header( 'X-WP-TotalPages', (int) ceil( $total / $per_page ) );
		}

		$response->set_data( $visible );

		return $response;
	}

	/**
	 * Find a single batch operation, applying the same per-operation gate.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\BatchOperation|\WP_REST_Response|\WP_Error
	 */
	public function find( \WP_REST_Request $request ) {
		$operation = parent::find( $request );
		if ( is_wp_error( $operation ) ) {
			return $operation;
		}

		if ( ! $this->currentUserCanReadOperation( $operation ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You are not allowed to view this batch operation.', 'surecart' ),
				[ 'status' => 403 ]
			);
		}

		return $operation;
	}
}
