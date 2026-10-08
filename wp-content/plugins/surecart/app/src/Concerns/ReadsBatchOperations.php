<?php

namespace SureCart\Concerns;

use SureCart\Rest\BatchesRestServiceProvider;

/**
 * The read gate for batch operations, shared by the two routes that can hand
 * them to a client.
 *
 * `/batch_operations` returns them directly; `/batches` embeds them whenever
 * the caller expands `batch_operations`, and query params are forwarded to the
 * platform verbatim. Both routes must apply the same rule, or the expand is a
 * way around the direct route's gate.
 */
trait ReadsBatchOperations {
	/**
	 * Whether the current user could have created (and so may read) the operation.
	 *
	 * @param object|array $operation Batch operation (model or array shape).
	 *
	 * @return bool
	 */
	protected function currentUserCanReadOperation( $operation ) {
		$method = is_object( $operation ) ? ( $operation->http_method ?? '' ) : ( $operation['http_method'] ?? '' );
		$path   = is_object( $operation ) ? ( $operation->path ?? '' ) : ( $operation['path'] ?? '' );

		$cap = BatchesRestServiceProvider::requiredCapabilityFor( (string) $method, (string) $path );

		return $cap && current_user_can( $cap );
	}
}
