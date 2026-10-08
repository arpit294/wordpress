<?php

namespace SureCart\Integrations\Abstracts;

/**
 * Abstract base class for SEO plugin integrations that handle noindex robots meta.
 */
abstract class NoIndexService {
	/**
	 * The filter hook name for the robots meta.
	 *
	 * @var string
	 */
	protected $hook_name = '';

	/**
	 * The query vars that should trigger noindex.
	 *
	 * The `products-*` entries are also covered by prefix matching below;
	 * they stay here because they are part of the `surecart/noindex_query_vars`
	 * filter contract.
	 *
	 * @var array
	 */
	protected $query_vars = [
		'products-search',
		'products-order',
		'products-orderby',
		'line_items',
		'currency',
	];

	/**
	 * Query var prefixes whose facet keys should trigger noindex.
	 *
	 * Each product list on a page suffixes its keys with its own index
	 * (`products-search` for the first list, `products-1-search` for the
	 * second), so an exact-match list only ever covers the first list.
	 *
	 * @var array
	 */
	protected $query_var_prefixes = [ 'products' ];

	/**
	 * Facet names that stay indexable on their own.
	 *
	 * Pagination is a bounded set and page 2 onwards has to stay crawlable to
	 * reach the products on it. It is the filter and sort combinations that
	 * explode the URL space, and those take the whole URL — pagination
	 * included — into noindex with them.
	 *
	 * @var array
	 */
	protected $indexable_facets = [ 'page' ];

	/**
	 * The noindex robots.
	 *
	 * @var array
	 */
	protected $noindex_robots = [
		'noindex'  => 'noindex',
		'nofollow' => 'nofollow',
	];

	/**
	 * Bootstrap the service.
	 *
	 * @throws \RuntimeException If hook_name is not set.
	 *
	 * @return void
	 */
	public function bootstrap(): void {
		if ( empty( $this->hook_name ) ) {
			throw new \RuntimeException( 'Missing hook_name for noindex service: ' . static::class );
		}

		add_filter( $this->hook_name, [ $this, 'addNoindexForQueryVars' ] );
	}

	/**
	 * Modify robots to add noindex for SureCart query vars.
	 *
	 * @param array $robots Robots array.
	 *
	 * @return array Modified robots.
	 */
	public function addNoindexForQueryVars( array $robots ): array {
		/**
		 * Filter whether the current request should be noindexed.
		 *
		 * @param bool           $noindex Whether to noindex the request.
		 * @param array          $robots  The robots directives so far.
		 * @param NoIndexService $service The service making the decision.
		 */
		if ( apply_filters( 'surecart/should_noindex', $this->hasNoIndexQueryVars(), $robots, $this ) ) {
			return $this->noindex_robots;
		}

		return $robots;
	}

	/**
	 * Check if the current request has any SureCart query variables.
	 *
	 * @return bool True if any SureCart query var is present.
	 */
	protected function hasNoIndexQueryVars(): bool {
		$query_vars = $this->getNoIndexQueryVars();

		foreach ( $query_vars as $query_var ) {
			// Safe to use $_GET directly as we only check existence, not values.
			if ( isset( $_GET[ $query_var ] ) || get_query_var( $query_var ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				return true;
			}
		}

		return $this->hasFacetQueryVar();
	}

	/**
	 * Check for a product list facet key belonging to any list on the page.
	 *
	 * @return bool True if a facet key other than pagination is present.
	 */
	protected function hasFacetQueryVar(): bool {
		if ( empty( $this->query_var_prefixes ) ) {
			return false;
		}

		$prefixes = implode(
			'|',
			array_map(
				fn( $prefix ) => preg_quote( $prefix, '#' ),
				$this->query_var_prefixes
			)
		);

		// Matches `products-orderby` and `products-1-sc_collection` alike.
		$pattern = '#^(?:' . $prefixes . ')(?:-\d+)?-(.+)$#';

		// Safe to use $_GET directly as we only look at key names, not values.
		foreach ( array_keys( (array) $_GET ) as $key ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			if ( ! preg_match( $pattern, (string) $key, $matches ) ) {
				continue;
			}

			if ( ! in_array( $matches[1], $this->indexable_facets, true ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get SureCart query variables that should trigger noindex.
	 *
	 * @return array List of query variable names.
	 */
	protected function getNoIndexQueryVars(): array {
		$query_vars = $this->query_vars;

		// Add all registered taxonomies for sc_product.
		$product_taxonomies = get_object_taxonomies( 'sc_product', 'names' );
		if ( ! empty( $product_taxonomies ) ) {
			foreach ( $product_taxonomies as $taxonomy ) {
				$query_vars[] = 'products-' . $taxonomy;
			}
		}

		return apply_filters( 'surecart/noindex_query_vars', array_unique( $query_vars ), $this );
	}
}
