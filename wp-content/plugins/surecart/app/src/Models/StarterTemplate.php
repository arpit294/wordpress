<?php

namespace SureCart\Models;

/**
 * Starter template model for fetching from Astra Sites API.
 */
class StarterTemplate extends ExternalApiModel {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'v1/sites-and-pages';

	/**
	 * Base URL for external API
	 *
	 * @var string
	 */
	protected $base_url = 'https://websitedemos.net/wp-json/astra-sites/';

	/**
	 * Templates fetched per page.
	 *
	 * Must be a positive integer: the remote API runs it through absint(),
	 * so `-1` collapses to a single result.
	 *
	 * @var int
	 */
	const PER_PAGE = 100;

	/**
	 * Hard stop for the page walk, in case the remote never signals the
	 * last page.
	 *
	 * @var int
	 */
	const MAX_PAGES = 30;

	/**
	 * Default query parameters.
	 *
	 * @var array
	 */
	protected $default_query = [
		'required-plugin'    => 'surecart',
		'page-builder'       => 'gutenberg',
		'spectra-blocks-ver' => 'v3',
	];

	/**
	 * Fetch all templates from the remote API.
	 *
	 * The remote API is paginated; walk pages until a short page (or the
	 * `X-WP-TotalPages` header) signals the end, so a catalog larger than one
	 * page isn't silently truncated.
	 *
	 * @param array $query Additional query parameters.
	 * @return array|\WP_Error Templates keyed by their remote id, or error.
	 */
	public static function fetchAll( array $query = [] ) {
		// The list is identical for everyone and rarely changes, so cache it.
		$transient_key = 'sc_starter_templates_all_' . md5( wp_json_encode( $query ) );
		$cached        = get_transient( $transient_key );
		if ( false !== $cached ) {
			return $cached;
		}

		$templates = [];

		for ( $page = 1; $page <= self::MAX_PAGES; $page++ ) {
			$instance        = new static();
			$instance->query = array_merge(
				$query,
				[
					'per_page' => self::PER_PAGE,
					'page'     => $page,
				]
			);

			$result = $instance->makeRequest();

			// Don't cache failures — surface a first-page error, keep what we
			// have on a mid-walk hiccup, and let the next load retry either way.
			if ( is_wp_error( $result ) ) {
				return 1 === $page ? $result : $templates;
			}

			// Some APIs return an error status past the last page.
			if ( 200 !== (int) wp_remote_retrieve_response_code( $result ) ) {
				if ( 1 === $page ) {
					return [];
				}
				break;
			}

			$data = json_decode( wp_remote_retrieve_body( $result ), true );
			if ( ! is_array( $data ) ) {
				break;
			}

			// Keep only real template entries; ignore meta keys like sc_plugin_status.
			$templates = array_replace(
				$templates,
				array_filter(
					$data,
					fn( $template ) => is_array( $template ) && isset( $template['title'] )
				)
			);

			$total_pages = (int) wp_remote_retrieve_header( $result, 'x-wp-totalpages' );
			if ( ( $total_pages && $page >= $total_pages ) || count( $data ) < self::PER_PAGE ) {
				break;
			}
		}

		// Match ExternalApiModel::makeRequest()'s per-page cache TTL so this
		// outer cache never expires while stale per-page responses remain
		// cached underneath it.
		set_transient( $transient_key, $templates, DAY_IN_SECONDS );
		return $templates;
	}
}
