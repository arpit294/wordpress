<?php

namespace SureCart\WordPress\Admin;

/**
 * Registry of the admin pages served by the unified admin app.
 *
 * A client-side swap mounts a page whose controller never ran, so per-page
 * header data (title, report link, classic URL) is declared here for every
 * page and shipped to `menuSync.js` as `scData.page_chrome`.
 */
class AdminPageRegistry {
	/**
	 * Slugs the unified app renders; `packages/admin/app/registry.js` must match.
	 *
	 * @var string[]
	 */
	const UNIFIED_SPA_PAGES = array(
		'sc-dashboard',
		'sc-products',
		'sc-bundles',
		'sc-product-collections',
		'sc-product-groups',
		'sc-reviews',
		'sc-orders',
		'sc-invoices',
		'sc-abandoned-checkouts',
		'sc-shipping-labels',
		'sc-subscriptions',
		'sc-customers',
		'sc-coupons',
		'sc-bumps',
		'sc-upsell-funnels',
		'sc-auto-fees',
		'sc-licenses',
		'sc-forms',
		'sc-cancellation-insights',
		'sc-affiliates',
		'sc-affiliate-clicks',
		'sc-affiliate-payouts',
		'sc-affiliate-payout-groups',
		'sc-affiliate-referrals',
		'sc-affiliate-requests',
		'sc-learn',
	);

	/**
	 * Unified pages with no server-rendered classic view to toggle to.
	 *
	 * @var string[]
	 */
	const SPA_ONLY_PAGES = array(
		'sc-dashboard',
		'sc-learn',
	);

	/**
	 * Reports dashboard section per page slug — the header's "View Reports" button.
	 *
	 * @var string[]
	 */
	const REPORT_SECTIONS = array(
		'sc-orders'                => 'orders',
		'sc-abandoned-checkouts'   => 'abandoned_checkouts',
		'sc-subscriptions'         => 'subscriptions',
		'sc-bumps'                 => 'bumps',
		'sc-upsell-funnels'        => 'upsells',
		'sc-cancellation-insights' => 'cancellation_acts',
		'sc-affiliate-clicks'      => 'clicks',
		'sc-affiliate-payouts'     => 'payouts',
		'sc-affiliate-referrals'   => 'referrals',
	);

	/**
	 * Pages whose classic view is not `admin.php?page={slug}`.
	 *
	 * @var string[]
	 */
	const CLASSIC_VIEW_URLS = array(
		'sc-forms' => 'edit.php?post_type=sc_form',
	);

	/**
	 * Canonical page title; keep in step with each list's `ListHeader` title.
	 *
	 * @param string $slug Admin page slug.
	 * @return string Translated title, or '' for an unknown slug.
	 */
	public static function pageTitle( string $slug ): string {
		$titles = array(
			'sc-dashboard'               => __( 'Dashboard', 'surecart' ),
			'sc-products'                => __( 'Products', 'surecart' ),
			'sc-bundles'                 => __( 'Bundles', 'surecart' ),
			'sc-product-collections'     => __( 'Product Collections', 'surecart' ),
			'sc-product-groups'          => __( 'Upgrade Groups', 'surecart' ),
			'sc-reviews'                 => __( 'Reviews', 'surecart' ),
			'sc-orders'                  => __( 'Orders', 'surecart' ),
			'sc-invoices'                => __( 'Invoices', 'surecart' ),
			'sc-abandoned-checkouts'     => __( 'Abandoned Checkouts', 'surecart' ),
			'sc-subscriptions'           => __( 'Subscriptions', 'surecart' ),
			'sc-shipping-labels'         => __( 'Shipping Labels', 'surecart' ),
			'sc-customers'               => __( 'Customers', 'surecart' ),
			'sc-coupons'                 => __( 'Coupons', 'surecart' ),
			'sc-bumps'                   => __( 'Order Bumps', 'surecart' ),
			'sc-upsell-funnels'          => __( 'Upsells', 'surecart' ),
			'sc-auto-fees'               => __( 'Dynamic Pricing', 'surecart' ),
			'sc-licenses'                => __( 'Licenses', 'surecart' ),
			'sc-forms'                   => __( 'Checkout Forms', 'surecart' ),
			'sc-cancellation-insights'   => __( 'Cancellations', 'surecart' ),
			'sc-affiliates'              => __( 'Affiliates', 'surecart' ),
			'sc-affiliate-clicks'        => __( 'Clicks', 'surecart' ),
			'sc-affiliate-payouts'       => __( 'Payouts', 'surecart' ),
			'sc-affiliate-payout-groups' => __( 'Payout Batches', 'surecart' ),
			'sc-affiliate-referrals'     => __( 'Referrals', 'surecart' ),
			'sc-affiliate-requests'      => __( 'Affiliate Requests', 'surecart' ),
			'sc-learn'                   => __( 'Learn', 'surecart' ),
		);
		return $titles[ $slug ] ?? '';
	}

	/**
	 * Reports dashboard URL for a page, or '' when it has no report.
	 *
	 * @param string $slug Admin page slug.
	 * @return string
	 */
	public static function reportUrl( string $slug ): string {
		if ( ! isset( self::REPORT_SECTIONS[ $slug ] ) ) {
			return '';
		}
		return add_query_arg(
			'switch_account_id',
			\SureCart::account()->id,
			SURECART_REPORTS_URL . self::REPORT_SECTIONS[ $slug ]
		);
	}

	/**
	 * Admin page slug of the current request, or ''.
	 *
	 * @return string
	 */
	public static function currentSlug(): string {
		return isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}

	/**
	 * Whether a page has a classic view, i.e. whether the view toggle applies to it.
	 *
	 * @param string $slug Admin page slug.
	 * @return bool
	 */
	public static function hasClassicView( string $slug ): bool {
		return ! in_array( $slug, self::SPA_ONLY_PAGES, true );
	}

	/**
	 * Where the view toggle returns to for a page, or '' when it has no classic view.
	 *
	 * @param string $slug Admin page slug.
	 * @return string
	 */
	public static function classicViewUrl( string $slug ): string {
		if ( ! self::hasClassicView( $slug ) ) {
			return '';
		}
		return admin_url( self::CLASSIC_VIEW_URLS[ $slug ] ?? 'admin.php?page=' . $slug );
	}

	/**
	 * Per-page header data for `scData.page_chrome`, keyed by slug.
	 *
	 * @return array<string, array{title: string, report_url: string, classic_url: string}>
	 */
	public static function pageChrome(): array {
		$chrome = array();
		foreach ( self::UNIFIED_SPA_PAGES as $slug ) {
			$chrome[ $slug ] = array(
				'title'       => self::pageTitle( $slug ),
				'report_url'  => self::reportUrl( $slug ),
				'classic_url' => self::classicViewUrl( $slug ),
			);
		}
		return $chrome;
	}
}
