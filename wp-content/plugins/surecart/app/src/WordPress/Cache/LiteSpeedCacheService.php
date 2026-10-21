<?php

namespace SureCart\WordPress\Cache;

/**
 * LiteSpeed Cache Service.
 */
class LiteSpeedCacheService extends CacheService {
	/**
	 * Register the plugin's cache hooks.
	 *
	 * Does not call parent::registerHooks() — LiteSpeed's finalize hook
	 * (onControlFinalize()) replaces the base 'wp' hook for cache-control
	 * decisions, so only the REST API and purge hooks are shared.
	 *
	 * @return void
	 */
	protected function registerHooks(): void {
		// Use LiteSpeed's finalize hook for cache control decisions.
		add_action( 'litespeed_control_finalize', [ $this, 'onControlFinalize' ] );

		// Add vary cookies for SureCart sessions.
		add_filter( 'litespeed_vary_cookies', [ $this, 'addVaryCookies' ] );

		// Exclude critical WordPress scripts from JS defer.
		add_filter( 'litespeed_optm_js_defer_exc', [ $this, 'getMergedJsDeferExcludes' ] );

		// Disable cache for SureCart REST API requests.
		add_action( 'rest_api_init', [ $this, 'maybeDisableCacheForRestApi' ], 1 );

		// Purge cache when product stock is adjusted.
		add_action( 'surecart/product_stock_adjusted', [ $this, 'purgeProductCacheOnStockAdjustment' ] );
	}

	/**
	 * Check if LiteSpeed Cache plugin is active.
	 *
	 * @return bool
	 */
	protected function isCachePluginActive(): bool {
		return has_action( 'litespeed_control_set_nocache' );
	}

	/**
	 * Disable cache for the current page.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	protected function disableCache( string $reason ): void {
		do_action( 'litespeed_control_set_nocache', $reason );
	}

	/**
	 * Handle cache control during LiteSpeed's finalize phase.
	 *
	 * @param string|false $esi_id ESI block ID if this is an ESI request.
	 * @return void
	 */
	public function onControlFinalize( $esi_id = false ) {
		// Only proceed if the page is currently marked as cacheable.
		if ( ! apply_filters( 'litespeed_control_cacheable', false ) ) {
			return;
		}

		// Delegate so additions to the shared exclusion logic propagate automatically.
		$this->maybeDisableCache();
	}

	/**
	 * Add SureCart session cookies to LiteSpeed Cache vary cookies.
	 *
	 * @param array $cookies Existing vary cookies.
	 * @return array
	 */
	public function addVaryCookies( $cookies ) {
		if ( ! is_array( $cookies ) ) {
			$cookies = [];
		}

		return array_merge( $cookies, $this->getVaryCookies() );
	}

	/**
	 * Purge LiteSpeed's cache for a single post.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	protected function purgeCachedPost( int $post_id ): void {
		if ( has_action( 'litespeed_purge_post' ) ) {
			do_action( 'litespeed_purge_post', $post_id );
		}
	}
}
