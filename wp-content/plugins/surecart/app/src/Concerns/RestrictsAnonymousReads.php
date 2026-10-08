<?php

namespace SureCart\Concerns;

/**
 * Restricts what anonymous callers can read from catalog REST endpoints
 * that proxy the private platform API with the store's secret token.
 *
 * Controllers using this trait must declare these properties:
 * - `$edit_capability` (string) The capability that unlocks unrestricted reads.
 * - `$anonymous_expands` (array) Expand values safe to forward for anonymous callers.
 * - `$anonymous_scope` (array) Query filters forced onto anonymous requests.
 *
 * Optionally:
 * - `$anonymous_hides_archived` (bool) Hide archived records on find for anonymous callers.
 * - `$anonymous_visible_statuses` (array) Only these statuses are visible on find for anonymous callers.
 */
trait RestrictsAnonymousReads {
	/**
	 * Run some middleware to run before request.
	 *
	 * Controllers using this trait must not override this method — override
	 * catalogMiddleware() instead, so the anonymous restriction can never be
	 * silently shadowed away.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function middleware( $class, \WP_REST_Request $request ) {
		// restriction runs first so the expand allow-list is applied before any controller expand logic.
		return parent::middleware( $this->catalogMiddleware( $this->restrictAnonymousReads( $class, $request ), $request ), $request );
	}

	/**
	 * Controller-specific middleware hook, run after the anonymous restriction.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function catalogMiddleware( $class, \WP_REST_Request $request ) {
		return $class;
	}

	/**
	 * Force the anonymous read scope and expand allow-list for callers
	 * without the edit capability.
	 *
	 * Runs before the request params are merged into the model query, so
	 * the forced filters win over client params (see Model::where merge order).
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function restrictAnonymousReads( $class, \WP_REST_Request $request ) {
		if ( current_user_can( $this->edit_capability ) ) {
			return $class;
		}

		/**
		 * Filters the expand values callers without the edit capability may
		 * forward to the platform for this resource.
		 *
		 * WARNING: this is a security control. Widening the allow-list forwards
		 * the expand to the private platform API with the store's secret token
		 * and re-exposes private platform data (files, commission structures,
		 * customer PII) to anonymous callers.
		 *
		 * @param array                  $expands Allowed expand values.
		 * @param \SureCart\Models\Model $class   Model class instance being queried.
		 * @param \WP_REST_Request       $request Request object.
		 */
		$anonymous_expands = apply_filters( 'surecart/rest/anonymous_expands', $this->anonymous_expands, $class, $request );

		// only allow-listed expands may be forwarded to the platform.
		if ( ! empty( $request['expand'] ) ) {
			$request->set_param( 'expand', array_values( array_intersect( array_filter( (array) $request['expand'], 'is_string' ), $anonymous_expands ) ) );
		}

		$scope = $this->anonymousScope( $request );
		if ( ! empty( $scope ) ) {
			$class->where( $scope );
		}

		return $class;
	}

	/**
	 * Query filters forced onto list requests from callers without the edit capability.
	 *
	 * Controllers override this to widen the scope for a caller who can prove
	 * ownership. Must fail closed to `$anonymous_scope`.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return array
	 */
	protected function anonymousScope( \WP_REST_Request $request ) {
		return $this->anonymous_scope ?? [];
	}

	/**
	 * Find model.
	 *
	 * Platform show endpoints ignore list filters, so hide draft and
	 * archived records from anonymous callers after fetching.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Model|false|\WP_Error False when a 'finding' model event cancels the fetch.
	 */
	public function find( \WP_REST_Request $request ) {
		$model = parent::find( $request );

		if ( empty( $model ) || is_wp_error( $model ) || current_user_can( $this->edit_capability ) ) {
			return $model;
		}

		if ( $this->isHiddenFromAnonymous( $model ) ) {
			/**
			 * Filters whether a caller without the edit capability may still read
			 * a record that anonymous reads would otherwise hide (draft or archived).
			 *
			 * WARNING: this is a security control. Returning true re-exposes
			 * unreleased catalog data to callers without the edit capability, so
			 * any widening must verify ownership itself. Anonymous callers must
			 * keep getting the 404.
			 *
			 * @param boolean                $allowed Whether the caller may read the hidden record.
			 * @param \SureCart\Models\Model $model   Fetched model.
			 * @param \WP_REST_Request       $request Request object.
			 */
			if ( ! apply_filters( 'surecart/rest/anonymous_can_view_hidden', $this->anonymousCanViewHidden( $model ), $model, $request ) ) {
				return new \WP_Error( 'rest_not_found', __( 'Not found.', 'surecart' ), [ 'status' => 404 ] );
			}
		}

		return $model;
	}

	/**
	 * Ownership exception for records hidden from anonymous reads.
	 *
	 * Controllers override this to let a caller read a hidden record they can
	 * prove ownership of (e.g. a customer's purchased draft product). Must
	 * fail closed — anonymous callers keep the 404.
	 *
	 * @param \SureCart\Models\Model $model Fetched model.
	 *
	 * @return boolean
	 */
	protected function anonymousCanViewHidden( $model ) {
		return false;
	}

	/**
	 * Should this record be hidden from anonymous callers?
	 *
	 * @param \SureCart\Models\Model $model Fetched model.
	 *
	 * @return boolean
	 */
	protected function isHiddenFromAnonymous( $model ) {
		if ( ! empty( $this->anonymous_hides_archived ) && true === $model->archived ) {
			return true;
		}

		if ( ! empty( $this->anonymous_visible_statuses ) && ! empty( $model->status ) && ! in_array( $model->status, $this->anonymous_visible_statuses, true ) ) {
			return true;
		}

		return false;
	}
}
