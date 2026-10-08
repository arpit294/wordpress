<?php

namespace SureCart\Support\Scripts;

use SureCart\Support\Currency;
use SureCart\WordPress\Admin\AdminPageRegistry;

/**
 * Class for model edit pages to extend.
 */
abstract class AdminModelEditController {
	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = '';

	/**
	 * The webpack entry shared by every unified-SPA list screen.
	 *
	 * @var string
	 */
	const UNIFIED_SPA_PATH = 'admin/app';

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = '';

	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'links' ];

	/**
	 * Additional dependencies
	 *
	 * @var array
	 */
	protected $dependencies = [ 'sc-core-data', 'sc-ui-data' ];

	/**
	 * Whether this admin screen renders a `@wordpress/dataviews` table and
	 * needs the bundled DataViews stylesheet.
	 *
	 * @var bool
	 */
	protected $needs_dataviews_style = false;

	/**
	 * Data to pass to the page.
	 *
	 * @var array
	 */
	protected $data = [];

	/**
	 * Optional conditionally load.
	 */
	protected function condition() {
		return true;
	}

	/**
	 * Give unified-SPA pages the union of every resource's boot data.
	 *
	 * With one bundle serving many screens, a client-side navigation mounts a
	 * resource whose PHP controller never ran — so whichever page boots the
	 * document must carry the data every resource reads from `scData`, not
	 * just its own.
	 */
	protected function applyUnifiedSpaData(): void {
		if ( self::UNIFIED_SPA_PATH !== $this->path ) {
			return;
		}

		// Any unified page can render a DataViews list after a client-side
		// swap, so the boot page must carry the stylesheet and the
		// enhanced-views flag even when its own screen has no list (e.g.
		// the dashboard) — otherwise list apps mounted client-side read a
		// missing flag and bounce to a full server render.
		$this->needs_dataviews_style = true;

		// Color variables must not depend on which page booted the document;
		// brand styles ride along inert (scoped to `body.sc-brand-ui`).
		\SureCart::assets()->printAdminColors();
		\SureCart::assets()->printBrandColors();

		$this->with_data = array_unique(
			array_merge(
				$this->with_data,
				array(
					'currency',
					'supported_currencies',
					'links',
					'checkout_page_url',
					'i18n',
					'google_map_api_key',
					'claimed',
					'claim_url',
					'claim_expired',
				)
			)
		);

		$this->data['invoice_create_url']            = \SureCart::getUrl()->create( 'invoices' );
		$this->data['bulk_delete_nonce']             = wp_create_nonce( 'bulk_delete_nonce' );
		$this->data['can_manage_abandoned_settings'] = current_user_can( 'manage_sc_shop_settings' );
		$this->data['spa_pages']                     = AdminPageRegistry::UNIFIED_SPA_PAGES;
		$this->data['menu_families']                 = \SureCart\WordPress\Admin\Menus\AdminMenuPageService::MENU_FAMILIES;
		// Per-page header data for menuSync.js after a client-side swap.
		$this->data['page_chrome']                   = AdminPageRegistry::pageChrome();

		// Show the JSON code editor for the unified SPA pages, which is used in the order meta and other places.
		wp_enqueue_code_editor(
			[
				'type'       => 'application/json',
				'codemirror' => [
					'indentUnit' => 2,
					'tabSize'    => 2,
				],
			]
		);
	}

	/**
	 * Enqueue needed scripts
	 *
	 * @return void
	 */
	public function enqueueScriptDependencies() {
		wp_enqueue_media();
		wp_enqueue_style( 'wp-components' );
		wp_enqueue_style( 'wp-editor' );
	}

	/**
	 * Enqueue components
	 *
	 * @return void
	 */
	public function enqueueComponents() {
		wp_enqueue_script( 'surecart-components' );
		wp_enqueue_style( 'surecart-themes-default' );
		wp_add_inline_style(
			'surecart-themes-default',
			':root { --sc-color-primary-text: #fff; }' // this is important in case the user has a dark primary text.
		);
		wp_add_inline_style(
			'surecart-themes-default',
			'.sc-dragging { z-index: 1 }' // this is required for dragging.
		);
	}

	/**
	 * Enqueue the bundled `@wordpress/dataviews` stylesheet copied to
	 * `dist/vendor/` at build time. See `webpack.config.js` for the
	 * CopyPlugin pattern that produces this file.
	 *
	 * Only enqueues when `$needs_dataviews_style` is set on the controller.
	 */
	protected function enqueueDataviewsStyle(): void {
		if ( ! $this->needs_dataviews_style ) {
			return;
		}
		$relative = is_rtl() ? 'dist/vendor/dataviews-rtl.css' : 'dist/vendor/dataviews.css';
		$abs_path = plugin_dir_path( SURECART_PLUGIN_FILE ) . $relative;
		if ( ! file_exists( $abs_path ) ) {
			return;
		}

		$version  = defined( 'SURECART_VERSION' ) ? SURECART_VERSION : (string) filemtime( $abs_path );
		$base_url = trailingslashit( \SureCart::core()->assets()->getUrl() );

		// The stylesheet references `--wpds-*` tokens but no longer defines
		// them, so this has to load first or nothing is sized or coloured.
		$tokens_relative = 'dist/vendor/design-tokens.css';
		if ( file_exists( plugin_dir_path( SURECART_PLUGIN_FILE ) . $tokens_relative ) ) {
			wp_enqueue_style( 'sc-design-tokens', $base_url . $tokens_relative, [], $version );
		}

		wp_enqueue_style(
			'sc-dataviews',
			$base_url . $relative,
			wp_style_is( 'sc-design-tokens', 'registered' ) ? [ 'sc-design-tokens' ] : [],
			$version
		);
	}

	/**
	 * Whether this request is a server-rendered classic list, where the unified
	 * bundle would load and mount nothing.
	 *
	 * Edit/create routes (`action` present) and SPA-only screens always boot the
	 * bundle, whatever the enhanced-views flag says.
	 *
	 * @return bool
	 */
	protected function servesClassicList(): bool {
		return self::UNIFIED_SPA_PATH === $this->path
			&& empty( $_GET['action'] ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			&& AdminPageRegistry::hasClassicView( AdminPageRegistry::currentSlug() )
			&& ! (bool) get_option( 'surecart_enhanced_admin_views', true );
	}

	/**
	 * Enqueue scripts
	 *
	 * @return void
	 */
	public function enqueue() {
		if ( ! $this->condition() ) {
			return;
		}

		if ( $this->servesClassicList() ) {
			$this->enqueueComponents();
			return;
		}

		$this->applyUnifiedSpaData();

		// components are also used on index pages.
		$this->enqueueComponents();
		$this->enqueueDataviewsStyle();

		// match url query for the scripts.
		if ( ! empty( $this->url_query ) ) {
			foreach ( $this->url_query as $param => $value ) {
				// phpcs:ignore
				if ( ! isset( $_GET[ $param ] ) || $value !== sanitize_text_field( wp_unslash( $_GET[ $param ] ) ) ) {
					return;
				}
			}
		}

		// enqueue dependencies.
		$this->enqueueScriptDependencies();

		// Fix Jetpack script key hijacking issues.
		add_filter(
			'admin_head',
			function () {
				wp_dequeue_script( 'wpcom-notes-common' );
				wp_dequeue_script( 'wpcom-notes-admin-bar' );
				wp_dequeue_style( 'wpcom-notes-admin-bar' );
				wp_dequeue_style( 'noticons' );
			},
			200
		);

		// automatically load dependencies and version.
		$asset_file_path = plugin_dir_path( SURECART_PLUGIN_FILE ) . "dist/$this->path.asset.php";
		if ( ! file_exists( $asset_file_path ) ) {
			// Bundle hasn't been built yet (e.g. fresh install or the entry
			// was just added without running `yarn build`). Bail rather than
			// crashing on an `array_merge( null, ... )`.
			return;
		}
		$asset_file = include $asset_file_path;

		// Fall back to plugin version so we still cache-bust on upgrade if
		// the asset manifest is missing or malformed.
		$version = $asset_file['version'] ?? ( defined( 'SURECART_VERSION' ) ? SURECART_VERSION : null );

		// Enqueue scripts.
		wp_enqueue_script(
			$this->handle,
			trailingslashit( \SureCart::core()->assets()->getUrl() ) . "dist/$this->path.js",
			array_merge( $asset_file['dependencies'] ?? [], $this->dependencies ),
			$version,
			true
		);

		// Enqueue extracted CSS if the build produced a stylesheet for this entry.
		$style_path = plugin_dir_path( SURECART_PLUGIN_FILE ) . "dist/$this->path.css";
		if ( file_exists( $style_path ) ) {
			wp_enqueue_style(
				$this->handle,
				trailingslashit( \SureCart::core()->assets()->getUrl() ) . "dist/$this->path.css",
				array(),
				$version
			);
		}

		// Enqueue the vendor/library stylesheet (style-{entry}.css) produced by splitChunks.
		$vendor_style_basename = 'style-' . basename( $this->path );
		$vendor_style_dir      = dirname( $this->path );
		$vendor_style_rel      = ( '.' === $vendor_style_dir ? '' : $vendor_style_dir . '/' ) . $vendor_style_basename . '.css';
		$vendor_style_path     = plugin_dir_path( SURECART_PLUGIN_FILE ) . "dist/$vendor_style_rel";
		if ( file_exists( $vendor_style_path ) ) {
			wp_enqueue_style(
				$this->handle . '-vendor',
				trailingslashit( \SureCart::core()->assets()->getUrl() ) . "dist/$vendor_style_rel",
				array(),
				$version
			);
		}

		if ( $this->needs_dataviews_style ) {
			$this->data['enhanced_admin_views_enabled'] = (bool) get_option( 'surecart_enhanced_admin_views', true );
			$this->data['modern_view_intro']            = \SureCart\Settings\SettingService::getModernViewIntroData();
		}

		// pass app url.
		$this->data['upgrade_url']           = \SureCart::config()->links->purchase;
		$this->data['surecart_app_url']      = defined( 'SURECART_APP_URL' ) ? SURECART_APP_URL : '';
		$this->data['account_id']            = \SureCart::account()->id ?? '';
		$this->data['account_slug']          = \SureCart::account()->slug ?? '';
		$this->data['import_export']         = \SureCart::importExport()->deepLinks();
		$this->data['api_url']               = \SureCart::requests()->getBaseUrl();
		$this->data['plugin_url']            = \SureCart::core()->assets()->getUrl();
		$this->data['locale']                = str_replace( '_', '-', get_locale() );
		$this->data['root_url']              = esc_url_raw( get_rest_url() );
		$this->data['home_url']              = untrailingslashit( get_home_url() );
		$this->data['site_name']             = get_bloginfo( 'name' );
		$this->data['site_icon_url']         = get_site_icon_url( 96 );
		$this->data['buy_page_slug']         = untrailingslashit( \SureCart::settings()->permalinks()->getBase( 'buy_page' ) );
		$this->data['product_page_slug']     = untrailingslashit( \SureCart::settings()->permalinks()->getBase( 'product_page' ) );
		$this->data['collection_page_slug']  = untrailingslashit( \SureCart::settings()->permalinks()->getBase( 'collection_page' ) );
		$this->data['is_block_theme']        = \SureCart::utility()->blockTemplates()->isFSETheme();
		$this->data['claim_url']             = ! \SureCart::account()->claimed ? \SureCart::routeUrl( 'account.claim' ) : '';
		$this->data['claim_expired']         = \SureCart::account()->claim_expired ?? false;
		$this->data['is_woocommerce_active'] = class_exists( 'WooCommerce' );

		if ( in_array( 'currency', $this->with_data ) ) {
			$this->data['currency_code'] = \SureCart::account()->currency;
		}
		if ( in_array( 'review_protocol', $this->with_data ) ) {
			$this->data['review_protocol'] = \SureCart::account()->review_protocol;
		}
		if ( in_array( 'tax_protocol', $this->with_data ) ) {
			$this->data['tax_protocol'] = \SureCart::account()->tax_protocol;
		}
		if ( in_array( 'shipping_protocol', $this->with_data ) ) {
			$this->data['shipping_protocol'] = \SureCart::account()->shipping_protocol;
		}
		if ( in_array( 'checkout_page_url', $this->with_data ) ) {
			$this->data['checkout_page_url'] = \SureCart::getUrl()->checkout();
		}
		if ( in_array( 'supported_currencies', $this->with_data ) ) {
			$this->data['supported_currencies'] = Currency::list();
		}
		if ( in_array( 'links', $this->with_data ) ) {
			$this->data['links'] = [];
			foreach ( array_keys( \SureCart::getAdminPageNames() ) as $name ) {
				$this->data['links'][ $name ] = esc_url_raw( add_query_arg( [ 'action' => 'edit' ], \SureCart::getUrl()->index( $name ) ) );
			}
		}
		if ( in_array( 'google_map_api_key', $this->with_data ) ) {
			$this->data['google_map_api_key'] = \SureCart::googleMaps()->getApiKey();
		}

		// pass entitlements to page.
		$this->data['entitlements'] = \SureCart::account()->entitlements;
		$this->data['get_locale']   = str_replace( '_', '-', determine_locale() );

		// pass wp user roles to page.
		$this->data['wp_user_roles'] = get_editable_roles();

		wp_set_script_translations( $this->handle, 'surecart' );

		// common localizations.
		wp_localize_script(
			$this->handle,
			'scData',
			apply_filters( "$this->handle/data", $this->data )
		);

		wp_localize_script( $this->handle, 'scIcons', [ 'path' => esc_url_raw( plugin_dir_url( SURECART_PLUGIN_FILE ) . 'dist/icon-assets' ) ] );

		// custom localizations.
		$this->localize( $this->handle );
	}

	protected function localize( $handle ) {
	}
}
