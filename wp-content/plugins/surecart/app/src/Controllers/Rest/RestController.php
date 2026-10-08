<?php

namespace SureCart\Controllers\Rest;

/**
 * Rest controller base class.
 */
abstract class RestController {
	/**
	 * Always fetch with these subcollections.
	 *
	 * @var array
	 */
	protected $with = [];

	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = '';

	/**
	 * Resource slug used in dynamic filter names — e.g. `products`,
	 * `product_collections`. Subclasses set this to opt into the
	 * resource-scoped `surecart/{resource}/list/...` filter hooks.
	 *
	 * @var string
	 */
	protected $resource = '';

	/**
	 * Query params safe to forward to the platform API.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return array
	 */
	protected function forwardableQueryParams( \WP_REST_Request $request ) {
		$params = $request->get_query_params();

		// `expand_mode` is a REST-layer control flag only — never forward it
		// to the platform API.
		unset( $params['expand_mode'] );

		return $params;
	}

	/**
	 * Run some middleware to run before request.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function middleware( $class, \WP_REST_Request $request ) {
		return apply_filters( 'surecart/request/model', $class, $request );
	}

	/**
	 * Create model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function create( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		if ( ! empty( $this->with ) ) {
			$model = $model->with( $this->with );
		}

		return $model->where( $this->forwardableQueryParams( $request ) )->create( $request->get_json_params() );
	}

	/**
	 * Index model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function index( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		// `expand_mode=replace` lets a caller opt out of the forced `$with`
		// and own the expand set. No plugin-side allow-list: the additive
		// path already forwards client expands verbatim, and the platform
		// API is the authority on which relations each endpoint may expand.
		$replace_expands = 'replace' === $request->get_param( 'expand_mode' );

		if ( ! empty( $this->with ) && ! $replace_expands ) {
			$model = $model->with( $this->with );
		}

		$args = $request->get_params();

		// `expand_mode` is a REST-layer control flag only — never forward it to
		// the platform API.
		unset( $args['expand_mode'] );

		/**
		 * Filter the query args for any list endpoint.
		 *
		 * @param array            $args     Query args, keyed by param name.
		 * @param \WP_REST_Request $request  The original request.
		 * @param string           $resource Resource slug (empty if controller didn't set one).
		 */
		$args = apply_filters( 'surecart/rest/list/query_args', $args, $request, $this->resource );

		if ( $this->resource ) {
			/**
			 * Filter the query args for a specific list endpoint
			 * (e.g. `surecart/products/list/query_args`).
			 *
			 * @param array            $args    Query args, keyed by param name.
			 * @param \WP_REST_Request $request The original request.
			 */
			$args = apply_filters( "surecart/{$this->resource}/list/query_args", $args, $request );
		}

		$items = $model->where( $args )->paginate(
			[
				'per_page' => $request->get_param( 'per_page' ),
				'page'     => $request->get_param( 'page' ),
			]
		);

		if ( is_wp_error( $items ) ) {
			return $items;
		}

		$response = rest_ensure_response( $items->data );
		$response->header( 'X-WP-Total', (int) ( $items->pagination->count ?? 0 ) );
		$max_pages = ceil( ( $items->pagination->count ?? 0 ) / ( $items->pagination->limit ?? 1 ) );
		$response->header( 'X-WP-TotalPages', (int) $max_pages );

		if ( $this->resource ) {
			/**
			 * Filter the response for a specific list endpoint
			 * (e.g. `surecart/products/list/response`).
			 */
			$response = apply_filters( "surecart/{$this->resource}/list/response", $response, $request, $args );
		}

		/**
		 * Filter the response for any list endpoint.
		 */
		return apply_filters( 'surecart/rest/list/response', $response, $request, $args, $this->resource );
	}

	/**
	 * Find model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Model|\WP_Error
	 */
	public function find( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		// `expand_mode=replace` lets a caller opt out of the forced `$with`
		// and own the expand set entirely, matching index().
		$replace_expands = 'replace' === $request->get_param( 'expand_mode' );
		if ( ! empty( $this->with ) && ! $replace_expands ) {
			$model = $model->with( $this->with );
		}

		return $model->where( $this->forwardableQueryParams( $request ) )->find( $request['id'] );
	}

	/**
	 * Edit model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function edit( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		// `expand_mode=replace` lets a caller opt out of the forced `$with`
		// and own the expand set entirely, matching index().
		$replace_expands = 'replace' === $request->get_param( 'expand_mode' );
		if ( ! empty( $this->with ) && ! $replace_expands ) {
			$model = $model->with( $this->with );
		}

		return $model->where( $this->forwardableQueryParams( $request ) )->update( $request->get_json_params() );
	}

	/**
	 * Delete model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function delete( \WP_REST_Request $request ) {
		$model = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $model ) ) {
			return $model;
		}

		if ( ! empty( $this->with ) ) {
			$model = $model->with( $this->with );
		}

		return $model->delete( $request['id'] );
	}
}
