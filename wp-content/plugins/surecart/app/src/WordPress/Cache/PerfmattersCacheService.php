<?php

namespace SureCart\WordPress\Cache;

/**
 * Perfmatters Cache Service.
 *
 * Perfmatters is a script optimizer with no page caching, so only its
 * delay-JS and defer features need handling. Interactivity API modules
 * read globals like wp.i18n at evaluation time, and WordPress cannot
 * declare a script-module dependency on a classic script — delaying those
 * globals reorders execution and breaks the modules (e.g. product media
 * slider).
 */
class PerfmattersCacheService extends CacheService {
	/**
	 * Hook Perfmatters' delay-JS and defer exclusion filters.
	 *
	 * Does not call parent::registerHooks() — Perfmatters is a script
	 * optimizer only and does no page caching.
	 *
	 * @return void
	 */
	protected function registerHooks(): void {
		add_filter( 'perfmatters_delay_js_exclusions', [ $this, 'getMergedJsDeferExcludes' ] );
		add_filter( 'perfmatters_defer_js_exclusions', [ $this, 'getMergedJsDeferExcludes' ] );

		// Keep the product gallery interactive without waiting for user interaction.
		add_filter( 'perfmatters_delay_js_exclusions', [ $this, 'excludeProductMediaFromDelay' ] );

		// Don't gate checkout/dashboard scripts behind first user interaction.
		add_filter( 'perfmatters_delay_js', [ $this, 'maybeDisableDelayJs' ] );
	}

	/**
	 * Disable delay-JS on dynamic SureCart pages.
	 *
	 * Mirrors Perfmatters' own WooCommerce handling, which skips JS
	 * optimization on cart/checkout/account pages entirely — delaying
	 * scripts until first interaction would leave the checkout unrendered.
	 *
	 * @param bool $enabled Whether delay-JS is enabled for this page.
	 * @return bool
	 */
	public function maybeDisableDelayJs( $enabled ) {
		if ( $this->shouldExcludeFromCache() ) {
			return false;
		}

		return $enabled;
	}

	/**
	 * Check if the Perfmatters plugin is active.
	 *
	 * @return bool
	 */
	protected function isCachePluginActive(): bool {
		return defined( 'PERFMATTERS_VERSION' );
	}

	/**
	 * Disable cache for the current page.
	 *
	 * No-op — Perfmatters does not cache pages.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	protected function disableCache( string $reason ): void {}
}
