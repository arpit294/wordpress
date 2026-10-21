<?php

namespace SureCart\WordPress\Cache;

/**
 * SiteGround Speed Optimizer (sg-cachepress) Cache Service.
 *
 * Covers SG Optimizer's Dynamic Cache/File Caching exclusions and its JS
 * async-load feature. Unlike WP Rocket/Perfmatters, SG Optimizer has no
 * delay-until-interaction feature and skips async-loading for logged-in
 * users entirely, so there's no script-module race to guard against here —
 * only cache exclusion and stock-purge need handling.
 */
class SiteGroundCacheService extends CacheService {
	/**
	 * Bump when the exclusions below change so SG Optimizer's File Caching
	 * config (where bypass cookies are baked in) is regenerated once automatically.
	 *
	 * @var string
	 */
	public const CONFIG_VERSION = '1';

	/**
	 * Migration that regenerates SG Optimizer's config file once per CONFIG_VERSION.
	 *
	 * @var SiteGroundConfigMigrationService
	 */
	protected $config_migration;

	/**
	 * Constructor.
	 *
	 * @param SiteGroundConfigMigrationService|null $config_migration Config-regeneration migration. Defaults to a
	 *                                                                  new instance so direct instantiation (e.g. in tests) keeps working.
	 */
	public function __construct( ?SiteGroundConfigMigrationService $config_migration = null ) {
		$this->config_migration = $config_migration ?? new SiteGroundConfigMigrationService();
	}

	/**
	 * Hook SG Optimizer's exclusion and purge APIs.
	 *
	 * Does not call parent::registerHooks() — the shared page-cache hooks
	 * are covered by the nocache_headers() call in DoNotCachePageService
	 * instead, which SG Optimizer's File Caching honors via its own
	 * Cache-Control: no-cache detection (has_nocache_headers()).
	 *
	 * @return void
	 */
	protected function registerHooks(): void {
		// Exclude critical WordPress scripts from async-loading.
		add_filter( 'sgo_js_async_exclude', [ $this, 'getMergedJsDeferExcludes' ] );

		// Exclude SureCart's ES module scripts from JS combination.
		add_filter( 'sgo_javascript_combine_exclude_ids', [ $this, 'excludeScriptModulesFromCombine' ] );

		// Skip File/Dynamic caching entirely once a customer session cookie is present.
		add_filter( 'sgo_bypass_cookies', [ $this, 'addBypassCookies' ] );

		// Never serve dynamic SureCart pages from cache.
		add_filter( 'sgo_exclude_urls_from_cache', [ $this, 'excludePagesFromCache' ] );

		// The bypass cookies above are baked into SG Optimizer's File Caching config — refresh it when they change.
		$this->config_migration->bootstrap();

		// Purge cache when product stock is adjusted.
		add_action( 'surecart/product_stock_adjusted', [ $this, 'purgeProductCacheOnStockAdjustment' ] );
	}

	/**
	 * Check if the SG Optimizer (Speed Optimizer / sg-cachepress) plugin is active.
	 *
	 * Checks sg_cachepress_purge_cache() — SG Optimizer's own public
	 * compatibility function, autoloaded via Composer's "files" autoload and
	 * available as soon as the plugin loads, well before our plugins_loaded:999 bootstrap.
	 *
	 * @return bool
	 */
	protected function isCachePluginActive(): bool {
		return function_exists( 'sg_cachepress_purge_cache' );
	}

	/**
	 * Disable cache for the current page.
	 *
	 * No-op — SG Optimizer's File Caching skips caching a response carrying
	 * a Cache-Control: no-cache header (already sent by DoNotCachePageService's
	 * shared nocache_headers() call) when apache_response_headers() is
	 * available, and SiteGround's server-level Dynamic Cache honors the same
	 * standard header.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	protected function disableCache( string $reason ): void {}

	/**
	 * Add SureCart session cookies to SG Optimizer's cache-bypass cookie list.
	 *
	 * Unlike LiteSpeed's vary-cookies (which cache a variant per cookie
	 * value), SG Optimizer's bypass_cookies skip caching entirely for a
	 * request carrying one of these — so a customer with an active checkout
	 * or account session never gets a cached response.
	 *
	 * @param array $cookies Existing bypass cookies.
	 * @return array
	 */
	public function addBypassCookies( $cookies ) {
		if ( ! is_array( $cookies ) ) {
			$cookies = [];
		}

		return array_merge( $cookies, $this->getVaryCookies() );
	}

	/**
	 * Exclude SureCart's ES module scripts from SG Optimizer's JS combination.
	 *
	 * SG Optimizer's combiner matches any `<script src="...">` tag by regex regardless of
	 * `type`, so it also sweeps up our `type="module"` scripts — concatenating their ES
	 * `import`/`export` syntax into a classic script throws a fatal SyntaxError that breaks
	 * the entire combined bundle. This list must be kept in sync with every
	 * `wp_register_script_module()` call in packages/blocks-next/index.php (the rendered
	 * script tag's id is the registered handle + "-js-module").
	 *
	 * @param array $exclude_ids Array of JS module IDs to exclude.
	 * @return array
	 */
	public function excludeScriptModulesFromCombine( $exclude_ids ) {
		if ( ! is_array( $exclude_ids ) ) {
			$exclude_ids = [];
		}

		// WordPress core script which also depends on interactivity.
		$exclude_ids[] = '@wordpress/block-library/navigation/view-js-module';

		// SureCart script modules registered in packages/blocks-next/index.php.
		$exclude_ids[] = '@surecart/api-fetch-js-module';
		$exclude_ids[] = '@surecart/dialog-js-module';
		$exclude_ids[] = '@surecart/dropdown-js-module';
		$exclude_ids[] = '@surecart/google-events-js-module';
		$exclude_ids[] = '@surecart/facebook-events-js-module';
		$exclude_ids[] = '@surecart/product-page-js-module';
		$exclude_ids[] = '@surecart/product-review-js-module';
		$exclude_ids[] = '@surecart/product-review-form-js-module';
		$exclude_ids[] = '@surecart/sticky-purchase-js-module';
		$exclude_ids[] = '@surecart/product-list-js-module';
		$exclude_ids[] = '@surecart/image-slider-js-module';
		$exclude_ids[] = 'surecart/lightbox-js-module';
		$exclude_ids[] = '@surecart/video-js-module';
		$exclude_ids[] = '@surecart/checkout-service-js-module';
		$exclude_ids[] = '@surecart/checkout-events-js-module';
		$exclude_ids[] = '@surecart/cart-js-module';
		$exclude_ids[] = '@surecart/product-quick-view-js-module';
		$exclude_ids[] = '@surecart/sidebar-js-module';
		$exclude_ids[] = '@surecart/checkout-js-module';
		$exclude_ids[] = '@surecart/line-item-details-js-module';
		$exclude_ids[] = '@surecart/line-item-note-js-module';
		$exclude_ids[] = '@surecart/order-bumps-js-module';

		return $exclude_ids;
	}

	/**
	 * Exclude dynamic SureCart page URLs from SG Optimizer's Dynamic/File caching.
	 *
	 * SG Optimizer builds one anchored regex from these patterns itself
	 * (File_Cacher::get_excluded_urls_regex()): each pattern is preg_quote()d
	 * then a literal `*` is turned back into `.*`, and the whole list is
	 * matched against the end of the current URL. So patterns here are plain
	 * relative paths with an optional trailing `*`, not pre-built regex
	 * fragments like WP Rocket's reject-URI list.
	 *
	 * @param array $urls Existing excluded URL patterns.
	 * @return array
	 */
	public function excludePagesFromCache( $urls ) {
		if ( ! is_array( $urls ) ) {
			$urls = [];
		}

		// Page-based exclusions share their page-key list with the runtime cache check (shouldExcludeFromCache()) so the two can't drift.
		foreach ( $this->getDynamicPageKeys() as $page ) {
			$path = $this->getPagePath( (int) \SureCart::pages()->getId( $page ) );
			if ( $path ) {
				// `*` is the only wildcard token SG Optimizer recognizes here (everything
				// else is preg_quote()d verbatim), so a boundary has to be two literal
				// entries: the exact path, and the path with a trailing slash before the
				// wildcard — otherwise "/checkout*" would also match "/checkout-guide".
				$urls[] = $path;
				$urls[] = $path . '/*';
			}
		}

		// Pretty buy permalinks (/buy/{product-slug}/) only exist with a permalink structure — plain-permalink and legacy ?sc-buy links are query-based and already covered by SG Optimizer's own query-string handling.
		if ( get_option( 'permalink_structure' ) ) {
			$buy_base = (string) \SureCart::settings()->permalinks()->getBase( 'buy_page' );
			if ( ! empty( $buy_base ) ) {
				$urls[] = '/' . trim( $buy_base, '/' ) . '/*';
			}
		}

		return array_values( array_unique( $urls ) );
	}

	/**
	 * Purge SG Optimizer's Dynamic/File cache for a single post.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	protected function purgeCachedPost( int $post_id ): void {
		if ( function_exists( 'sg_cachepress_purge_cache' ) ) {
			sg_cachepress_purge_cache( get_permalink( $post_id ) );
		}
	}
}
