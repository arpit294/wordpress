<?php

namespace SureCart\WordPress\Cache;

/**
 * Abstract Cache Service.
 */
abstract class CacheService {
	/**
	 * Bootstrap the service.
	 *
	 * The active-plugin guard lives here and only here — subclasses hook
	 * their plugin-specific wiring by overriding registerHooks(), not
	 * bootstrap() itself, so the guard can't be skipped by an override.
	 *
	 * @return void
	 */
	public function bootstrap() {
		if ( ! $this->isCachePluginActive() ) {
			return;
		}

		$this->registerHooks();
	}

	/**
	 * Register the plugin's cache hooks.
	 *
	 * Default wiring for plugins that support the shared page-cache checks
	 * as-is. Override for plugins that need different hooks (e.g.
	 * LiteSpeed's finalize-phase check, WP Rocket's reject-URI filters);
	 * call parent::registerHooks() first to keep the shared wiring.
	 *
	 * Deliberately does not hook 'surecart/product_stock_adjusted' — that only
	 * belongs to subclasses with a real purgeCachedPost() implementation, which
	 * must hook it themselves (see W3TotalCacheService/LiteSpeedCacheService/
	 * WpRocketCacheService/SiteGroundCacheService). Wiring it here unconditionally
	 * would fire the public 'surecart/cache/purged_product' action from every
	 * bootstrapped service — including DoNotCachePageService, which is always
	 * active and never purges anything — implying a purge that never happened.
	 *
	 * @return void
	 */
	protected function registerHooks(): void {
		// Disable cache for SureCart dynamic pages.
		add_action( 'wp', [ $this, 'maybeDisableCache' ] );

		// Disable cache for SureCart REST API requests.
		add_action( 'rest_api_init', [ $this, 'maybeDisableCacheForRestApi' ], 1 );
	}

	/**
	 * Disable cache for the current page.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	abstract protected function disableCache( string $reason ): void;

	/**
	 * Check if the cache plugin is active.
	 *
	 * @return bool
	 */
	abstract protected function isCachePluginActive(): bool;

	/**
	 * Check if the current page should be excluded from cache.
	 *
	 * @return bool
	 */
	public function shouldExcludeFromCache(): bool {
		return $this->isCustomerDashboardPage()
			|| $this->isCheckoutPage()
			|| $this->hasCheckoutFormBlock()
			|| $this->hasCustomerDashboardBlock()
			|| $this->isBuyPage();
	}

	/**
	 * Maybe disable cache for SureCart dynamic pages.
	 *
	 * @return void
	 */
	public function maybeDisableCache() {
		if ( $this->isCustomerDashboardPage() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart customer dashboard' );
			return;
		}

		if ( $this->isCheckoutPage() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart checkout page' );
			return;
		}

		if ( $this->hasCheckoutFormBlock() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart checkout form block' );
			return;
		}

		if ( $this->hasCustomerDashboardBlock() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart customer dashboard block' );
			return;
		}

		if ( $this->isBuyPage() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart buy page' );
			return;
		}
	}

	/**
	 * Disable both server-side and browser caching.
	 *
	 * @param string $reason Reason for disabling cache.
	 * @return void
	 */
	protected function disableCacheWithBrowserHeaders( string $reason ): void {
		// Disable server-side caching via the cache plugin.
		$this->disableCache( $reason );

		// Disable browser caching by sending no-cache headers.
		if ( ! headers_sent() ) {
			nocache_headers();
		}
	}

	/**
	 * Maybe disable cache for SureCart REST API requests.
	 *
	 * @return void
	 */
	public function maybeDisableCacheForRestApi() {
		if ( $this->isSureCartRestRequest() ) {
			$this->disableCacheWithBrowserHeaders( 'SureCart REST API request' );
		}
	}

	/**
	 * Check if the current request is a SureCart REST API request.
	 *
	 * @return bool
	 */
	protected function isSureCartRestRequest(): bool {
		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';

		if ( strpos( $request_uri, '/surecart/' ) !== false && strpos( $request_uri, 'wp-json' ) !== false ) {
			return true;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$rest_route = isset( $_GET['rest_route'] ) ? sanitize_text_field( wp_unslash( $_GET['rest_route'] ) ) : '';
		if ( strpos( $rest_route, '/surecart/' ) !== false ) {
			return true;
		}

		return false;
	}

	/**
	 * Purge product cache when stock is adjusted.
	 *
	 * Template method: subclasses implement purgeCachedPost() for their
	 * plugin-specific purge call rather than overriding this method, so the
	 * guard/action-firing logic lives in one place.
	 *
	 * @param \SureCart\Models\Product $product The product model.
	 * @return void
	 */
	public function purgeProductCacheOnStockAdjustment( $product ) {
		if ( empty( $product ) ) {
			return;
		}

		$post = $product->post ?? null;

		if ( $post instanceof \WP_Post ) {
			$this->purgeCachedPost( (int) $post->ID );
		}

		/**
		 * Action fired after purging cache for a product on stock adjustment.
		 *
		 * @param \SureCart\Models\Product $product The product model.
		 */
		do_action( 'surecart/cache/purged_product', $product );
	}

	/**
	 * Purge the cache for a single post.
	 *
	 * No-op by default (e.g. Perfmatters, which does no page caching).
	 * Override in child classes that need to issue a plugin-specific purge call.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	protected function purgeCachedPost( int $post_id ): void {}

	/**
	 * Page-type keys (as registered via SureCart::pages()) that render
	 * dynamic, per-customer content and must never be cached.
	 *
	 * Single source for both the current-request cache check
	 * (matchDynamicPage(), which backs isCustomerDashboardPage()/
	 * isCheckoutPage()) and any consumer that needs to build a static list
	 * of dynamic page URIs (e.g. WP Rocket's preload/reject-URI
	 * exclusions), so the two can't drift apart. Does not cover the
	 * block-based checks (hasCheckoutFormBlock(), hasCustomerDashboardBlock())
	 * or isBuyPage(), since those aren't tied to a single static page ID/URI.
	 *
	 * @return string[]
	 */
	protected function getDynamicPageKeys(): array {
		return [ 'checkout', 'dashboard' ];
	}

	/**
	 * Get the relative path of a published page, without a trailing slash.
	 *
	 * Shared by any optimizer that builds a static list of dynamic page URIs
	 * from getDynamicPageKeys() (e.g. WP Rocket's reject-URI exclusions,
	 * SiteGround's excluded-URLs list), so the path-resolution/front-page
	 * guard logic lives in one place.
	 *
	 * @param int $page_id Page ID.
	 * @return string Empty string when the page should not be excluded.
	 */
	protected function getPagePath( int $page_id ): string {
		if ( $page_id <= 0 ) {
			return '';
		}

		// Skip the front page — excluding it would disable caching site-wide.
		// page_on_front is only meaningful when show_on_front is 'page': WordPress
		// doesn't clear page_on_front when a site switches back to a posts-based
		// homepage, so a stale ID there must not be treated as "still the front page".
		if ( 'page' === get_option( 'show_on_front' ) && (int) get_option( 'page_on_front' ) === $page_id ) {
			return '';
		}

		if ( 'publish' !== get_post_status( $page_id ) ) {
			return '';
		}

		$path = wp_parse_url( get_permalink( $page_id ), PHP_URL_PATH );

		return $path ? untrailingslashit( $path ) : '';
	}

	/**
	 * Determine which dynamic SureCart page (if any) the current request matches.
	 *
	 * Iterates getDynamicPageKeys() so isCustomerDashboardPage()/isCheckoutPage()
	 * are derived from the same list used to build the WP Rocket URI
	 * exclusions, instead of each hardcoding its own page-id lookup.
	 *
	 * Uses is_page() instead of a URL comparison so subviews with query
	 * args (?action=index&model=invoice) are also matched.
	 *
	 * @return string Matching key from getDynamicPageKeys(), or '' if none match.
	 */
	protected function matchDynamicPage(): string {
		foreach ( $this->getDynamicPageKeys() as $key ) {
			$page_id = \SureCart::pages()->getId( $key );

			if ( ! empty( $page_id ) && is_page( $page_id ) ) {
				return $key;
			}
		}

		return '';
	}

	/**
	 * Check if the current page is the customer dashboard page.
	 *
	 * @return bool
	 */
	protected function isCustomerDashboardPage(): bool {
		return 'dashboard' === $this->matchDynamicPage();
	}

	/**
	 * Check if the current page is the checkout page.
	 *
	 * @return bool
	 */
	protected function isCheckoutPage(): bool {
		return 'checkout' === $this->matchDynamicPage();
	}

	/**
	 * Check if the current page has a checkout form block.
	 *
	 * @return bool
	 */
	protected function hasCheckoutFormBlock(): bool {
		$post = get_post();

		if ( ! $post ) {
			return false;
		}

		return has_block( 'surecart/checkout-form', $post ) || has_block( 'surecart/form', $post );
	}

	/**
	 * Check if the current page has a customer dashboard block.
	 *
	 * Dashboard blocks can live on pages other than the configured dashboard
	 * page (duplicates, custom account pages) — those render the same dynamic,
	 * per-user UI and must never be cached or have their scripts delayed.
	 *
	 * @return bool
	 */
	protected function hasCustomerDashboardBlock(): bool {
		$post = get_post();

		if ( ! $post ) {
			return false;
		}

		return has_block( 'surecart/dashboard-area', $post ) || has_block( 'surecart/customer-dashboard', $post );
	}

	/**
	 * Check if the current page is a buy page.
	 *
	 * Pretty buy permalinks (/buy/{product-slug}/) rewrite to the
	 * sc_checkout_product_id query var; sc-buy covers legacy buy links.
	 *
	 * @return bool
	 */
	protected function isBuyPage(): bool {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return isset( $_GET['sc-buy'] )
			|| ! empty( get_query_var( 'sc-buy' ) )
			|| ! empty( get_query_var( 'sc_checkout_product_id' ) );
	}

	/**
	 * Get SureCart vary cookies.
	 *
	 * @return array
	 */
	protected function getVaryCookies(): array {
		$cookies = [
			'sc_checkout_id',
			'sc_customer_id',
			'sc_order_id',
		];

		/**
		 * Filter the SureCart cookies used for cache variation.
		 *
		 * @param array $cookies Array of cookie names.
		 */
		return apply_filters( 'surecart/cache/vary_cookies', $cookies );
	}

	/**
	 * Get core WordPress scripts that should be excluded from JS defer.
	 *
	 * `wp-private-apis` must stay in lockstep with `wp-api-fetch`: current
	 * core builds have api-fetch opt in to `wp.privateApis.__dangerousOptInToUnstableAPIsOnlyForCoreModules()`
	 * at evaluation time, so if private-apis is delayed/deferred while
	 * api-fetch is excluded and runs synchronously, api-fetch's IIFE throws
	 * before it ever assigns `window.wp.apiFetch` — breaking every module
	 * that imports it (e.g. blocks-next's Add to Cart).
	 *
	 * @return array
	 */
	protected function getJsDeferExcludes(): array {
		$scripts = [
			'wp-api-fetch',
			'wp-private-apis',
			'wp-a11y',
			'wp-i18n',
			'wp-url',
			'dom-ready',
			'wp-hooks',
			'api-fetch',
			'private-apis.min.js',
			'a11y.min.js',
			'i18n.min.js',
			'url.min.js',
			'dom-ready.min.js',
			'hooks.min.js',
		];

		/**
		 * Filter the scripts excluded from JS delay/defer.
		 *
		 * @param array $scripts Array of script patterns to exclude.
		 */
		return apply_filters( 'surecart/cache/js_defer_excludes', $scripts );
	}

	/**
	 * Add critical scripts to an optimizer's delay/defer exclusion list.
	 *
	 * Named distinctly from W3TotalCacheService::excludeScriptsFromDefer()
	 * (which rewrites rendered <script> tags, not a pattern list) so PHP's
	 * method resolution can't let one silently override the other.
	 *
	 * The patterns include both script handles (matched against tag id
	 * attributes) and filenames (matched against src URLs) to cover both
	 * matching styles across optimizer plugins.
	 *
	 * @param array $excludes Existing excluded script patterns.
	 * @return array
	 */
	public function getMergedJsDeferExcludes( $excludes ) {
		if ( ! is_array( $excludes ) ) {
			$excludes = [];
		}

		return array_merge( $excludes, $this->getJsDeferExcludes() );
	}

	/**
	 * Exclude blocks-next's module scripts and the Interactivity API runtime from delay-JS.
	 *
	 * Not scoped to product pages: every blocks-next module registers the actions its own
	 * click/submit directives call (e.g. Add to Cart's `data-wp-on--click` handler, which
	 * exists purely to `preventDefault()` the button's native form submission). Delaying a
	 * module behind the very interaction meant to trigger it is unsafe wherever it renders —
	 * product pages, the shop page's quick-add, a custom page with a buy-button block — and
	 * there's no reliable page-level check to gate on: `has_block()` only sees blocks inside
	 * $post->post_content, which archive/shop and FSE templates don't guarantee. Excluding the
	 * whole `build/scripts/` directory unconditionally is also always safe — these are SureCart's
	 * own lightweight interactive glue, not a real optimization target for delay-JS.
	 *
	 * Patterns are matched as substrings of the full script tag by both WP Rocket and Perfmatters.
	 *
	 * @param array $exclusions Existing excluded script patterns.
	 * @return array
	 */
	public function excludeProductMediaFromDelay( $exclusions ) {
		if ( ! is_array( $exclusions ) ) {
			$exclusions = [];
		}

		$patterns = [
			// The Interactivity API runtime must run for directives (clicks, state, bindings) to hydrate at all.
			'/wp-includes/js/dist/script-modules/interactivity/',
			'/' . SURECART_PLUGIN_DIR_NAME . '/packages/blocks-next/build/scripts/',
		];

		/**
		 * Filter the script patterns excluded from delay-JS for blocks-next.
		 *
		 * Lets other next-gen blocks register their own delay-exclusion
		 * patterns without hardcoding block-internal paths in this class.
		 *
		 * @param array $patterns Script patterns to exclude.
		 */
		$patterns = apply_filters( 'surecart/cache/product_media_defer_excludes', $patterns );

		return array_merge( $exclusions, $patterns );
	}
}
