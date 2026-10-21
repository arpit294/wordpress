<?php

namespace SureCart\WordPress\Cache;

/**
 * WP Rocket Cache Service.
 *
 * Full WP Rocket compatibility. Page caching of dynamic SureCart pages is
 * already prevented via DONOTCACHEPAGE (DoNotCachePageService), which WP
 * Rocket honors — this service adds the pieces that need WP Rocket's own
 * filters: cache/preload URI exclusions, JS delay/defer exclusions, product
 * gallery delay exclusions, and cache purging on stock changes.
 */
class WpRocketCacheService extends CacheService {
	/**
	 * Bump when the exclusions below change so WP Rocket's config file
	 * (where reject URIs are baked in) is regenerated once automatically.
	 *
	 * @var string
	 */
	public const CONFIG_VERSION = '1';

	/**
	 * Migration that regenerates WP Rocket's config file once per CONFIG_VERSION.
	 *
	 * @var WpRocketConfigMigrationService
	 */
	protected $config_migration;

	/**
	 * Constructor.
	 *
	 * @param WpRocketConfigMigrationService|null $config_migration Config-regeneration migration. Defaults to a
	 *                                                               new instance so direct instantiation (e.g. in tests) keeps working.
	 */
	public function __construct( ?WpRocketConfigMigrationService $config_migration = null ) {
		$this->config_migration = $config_migration ?? new WpRocketConfigMigrationService();
	}

	/**
	 * Hook WP Rocket's exclusion and purge APIs.
	 *
	 * Does not call parent::registerHooks() — the shared page-cache hooks
	 * are covered by DONOTCACHEPAGE via DoNotCachePageService instead.
	 *
	 * @return void
	 */
	protected function registerHooks(): void {
		// Exclude critical WordPress scripts from delay-JS and defer.
		add_filter( 'rocket_delay_js_exclusions', [ $this, 'getMergedJsDeferExcludes' ] );
		add_filter( 'rocket_exclude_defer_js', [ $this, 'getMergedJsDeferExcludes' ] );

		// Keep the product gallery interactive without waiting for user interaction.
		add_filter( 'rocket_delay_js_exclusions', [ $this, 'excludeProductMediaFromDelay' ] );

		// Never serve dynamic SureCart pages from cache or crawl them on preload.
		add_filter( 'rocket_cache_reject_uri', [ $this, 'excludePagesFromCache' ] );
		add_filter( 'rocket_preload_exclude_urls', [ $this, 'excludePagesFromCache' ] );

		// The reject URIs above are baked into WP Rocket's config file — refresh it when they change.
		add_action( 'update_option_surecart_checkout_page_id', [ $this, 'regenerateConfig' ] );
		add_action( 'update_option_surecart_dashboard_page_id', [ $this, 'regenerateConfig' ] );
		add_action( 'update_option_surecart_permalinks', [ $this, 'regenerateConfig' ] );

		// Also regenerate once per CONFIG_VERSION, so exclusions apply without a manual WP Rocket settings save.
		$this->config_migration->bootstrap();

		// Purge cache when product stock is adjusted.
		add_action( 'surecart/product_stock_adjusted', [ $this, 'purgeProductCacheOnStockAdjustment' ] );
	}

	/**
	 * Check if the WP Rocket plugin is active.
	 *
	 * @return bool
	 */
	protected function isCachePluginActive(): bool {
		return defined( 'WP_ROCKET_VERSION' );
	}

	/**
	 * Disable cache for the current page.
	 *
	 * No-op — WP Rocket honors the DONOTCACHEPAGE constant set by
	 * DoNotCachePageService on dynamic SureCart pages.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	protected function disableCache( string $reason ): void {}

	/**
	 * Exclude dynamic SureCart page URIs from caching and preloading.
	 *
	 * Shared between `rocket_cache_reject_uri` and `rocket_preload_exclude_urls`:
	 * WP Rocket matches both against the request path with preg_match() (the
	 * reject-uri list is combined into one regex; the preload list is matched
	 * per-pattern), so the same preg_quote()d fragments are valid for either
	 * filter. If a future change needs a shape only one of the two filters
	 * accepts, split this into two methods instead of adjusting the shared output.
	 *
	 * @param array $uris Existing excluded URI patterns.
	 * @return array
	 */
	public function excludePagesFromCache( $uris ) {
		if ( ! is_array( $uris ) ) {
			$uris = [];
		}

		// Page-based exclusions share their page-key list with the runtime cache check (shouldExcludeFromCache()) so the two can't drift.
		foreach ( $this->getDynamicPageKeys() as $page ) {
			$path = $this->getPagePath( (int) \SureCart::pages()->getId( $page ) );
			if ( $path ) {
				// (?:[/?].*)? requires a path/query boundary before the wildcard tail, so
				// e.g. "/checkout" doesn't also match an unrelated "/checkout-guide" page.
				$uris[] = preg_quote( $path, '#' ) . '(?:[/?].*)?';
			}
		}

		// Pretty buy permalinks (/buy/{product-slug}/) only exist with a permalink structure — plain-permalink and legacy ?sc-buy links are query-based and not cached by WP Rocket.
		if ( get_option( 'permalink_structure' ) ) {
			$buy_base = (string) \SureCart::settings()->permalinks()->getBase( 'buy_page' );
			if ( ! empty( $buy_base ) ) {
				$uris[] = '/' . preg_quote( trim( $buy_base, '/' ), '#' ) . '/(.*)';
			}
		}

		return array_values( array_unique( $uris ) );
	}

	/**
	 * Regenerate WP Rocket's config file so filtered reject URIs take effect.
	 *
	 * @return void
	 */
	public function regenerateConfig() {
		if ( function_exists( 'rocket_generate_config_file' ) ) {
			rocket_generate_config_file();
		}
	}

	/**
	 * Purge WP Rocket's cache for a single post.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	protected function purgeCachedPost( int $post_id ): void {
		if ( function_exists( 'rocket_clean_post' ) ) {
			rocket_clean_post( $post_id );
		}
	}
}
