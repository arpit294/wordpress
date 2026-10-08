<?php

namespace SureCart\WordPress\Admin\Menus;

use SureCart\Models\ApiToken;

/**
 * Handles creation and enqueueing of admin menu pages and assets.
 */
class AdminMenuPageService {
	/**
	 * Top level menu slug.
	 *
	 * @var string
	 */
	protected $slug = 'sc-dashboard';

	/**
	 * Pages
	 *
	 * @var array
	 */
	protected $pages = array();

	/**
	 * Essential SureCart Pages
	 *
	 * @var array
	 */
	const ESSENTIAL_PAGES = array(
		'shop',
		'checkout',
		'dashboard',
	);

	/**
	 * Menu hidden pages.
	 *
	 * @var array
	 */
	const MENU_CURRENT_OVERRIDES = array(
		'sc-affiliate-payout-groups' => 'sc-affiliate-payouts',
	);

	/**
	 * Menu families: parent page slug → child page slugs shown when any page
	 * of the family is active. Registration, the family visibility CSS and
	 * the unified admin app's client-side menu sync all read this map.
	 *
	 * @var array<string, string[]>
	 */
	const MENU_FAMILIES = array(
		'sc-orders'        => array( 'sc-abandoned-checkouts', 'sc-invoices', 'sc-shipping-labels' ),
		'sc-products'      => array( 'sc-bundles', 'sc-product-collections', 'sc-product-groups', 'sc-reviews' ),
		'sc-coupons'       => array( 'sc-coupons', 'sc-auto-fees', 'sc-bumps', 'sc-upsell-funnels' ),
		'sc-subscriptions' => array( 'sc-cancellation-insights' ),
		'sc-affiliates'    => array( 'sc-affiliate-requests', 'sc-affiliate-clicks', 'sc-affiliate-referrals', 'sc-affiliate-payouts', 'sc-affiliate-payout-groups' ),
	);

	/**
	 * The parent slug of the family containing the given page slug, if any.
	 *
	 * @param string $page Current page slug.
	 * @return string Family parent slug, or '' when the page has no family.
	 */
	public static function menuFamilyFor( string $page ): string {
		foreach ( self::MENU_FAMILIES as $parent => $children ) {
			if ( $page === $parent || in_array( $page, $children, true ) ) {
				return $parent;
			}
		}
		return '';
	}

	/**
	 * Add menu items.
	 */
	public function bootstrap() {
		add_action( 'admin_menu', array( $this, 'registerAdminPages' ) );
		add_action( 'admin_head', array( $this, 'adminMenuCSS' ) );
		add_action( 'admin_head', array( $this, 'printViewTransitionStyles' ) );
		add_action( 'admin_print_footer_scripts', array( $this, 'printSpeculationRules' ) );
		add_filter( 'parent_file', array( $this, 'forceSelect' ) );
		add_filter( 'parent_file', array( $this, 'applyMenuOverrides' ) );
	}

	/**
	 * Whether the current admin request is one of our `sc-*` pages.
	 *
	 * @return bool
	 */
	protected function isSureCartPage(): bool {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return 0 === strpos( $page, 'sc-' );
	}

	/**
	 * Print speculation rules so hovering a SureCart menu item prerenders the
	 * target page — activation is then instant, giving cross-resource
	 * navigation an SPA feel with no client router and no extra JS.
	 *
	 * Only menu links to server-rendered SureCart screens qualify — every
	 * page in the unified admin app swaps client-side, so a speculative
	 * server render would be thrown away on each hover. That leaves the
	 * allowlist below. `href_matches` takes URLPattern syntax, NOT a regex:
	 * anchors inside groups and `preg_quote` escapes make the browser reject
	 * the whole rule set with only a console warning, silently disabling
	 * prerendering. Unsupported browsers ignore the script entirely.
	 */
	public function printSpeculationRules(): void {
		/**
		 * Filters whether SureCart admin pages are speculatively prerendered.
		 *
		 * @param bool $enabled Defaults to true.
		 */
		if ( ! apply_filters( 'surecart/admin/speculative_loading', true ) ) {
			return;
		}

		// Server-rendered screens reachable from the admin menu: settings is
		// deliberately outside the unified app, onboarding replaces the
		// dashboard slug before an API token exists. Their menu links carry
		// exactly `?page=<slug>`, so the pattern needs no param handling.
		$prerender_pages = array( 'sc-settings', 'sc-getting-started' );

		// Prerendering the page we are already on is pure waste.
		$current         = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$prerender_pages = array_values( array_diff( $prerender_pages, array( $current ) ) );
		if ( empty( $prerender_pages ) ) {
			return;
		}

		$rules = array(
			'prerender' => array(
				array(
					'eagerness' => 'moderate',
					'where'     => array(
						'and' => array(
							array( 'selector_matches' => '#adminmenu a' ),
							array( 'href_matches' => '/wp-admin/admin.php?page=(' . implode( '|', $prerender_pages ) . ')' ),
						),
					),
				),
			),
		);

		wp_print_inline_script_tag(
			(string) wp_json_encode( $rules ),
			array( 'type' => 'speculationrules' )
		);
	}

	/**
	 * Opt our screens into cross-document view transitions, so navigating
	 * between two SureCart pages cross-fades instead of flashing white.
	 *
	 * Both the outgoing and incoming document must carry the at-rule, so
	 * printing it only on `sc-*` pages scopes transitions to our own
	 * screens. Browsers without support ignore the rule.
	 */
	public function printViewTransitionStyles(): void {
		if ( ! $this->isSureCartPage() ) {
			return;
		}
		echo '<style>
			@view-transition { navigation: auto; }
			@media (prefers-reduced-motion: reduce) {
				@view-transition { navigation: none; }
			}
		</style>';
	}

	/**
	 * Make sure these menu items get selected.
	 *
	 * @param string $file The file string.
	 *
	 * @return string
	 */
	public function forceSelect( $file ) {
		global $submenu_file;
		global $post;

		if ( ! empty( $post->ID ) && in_array(
			$post->ID,
			array(
				\SureCart::pages()->getId( 'cart', 'sc_cart' ),
				\SureCart::pages()->getId( 'checkout' ),
				\SureCart::pages()->getId( 'shop' ),
				\SureCart::pages()->getId( 'dashboard' ),
			)
		) ) {
			$file = $this->slug;
			// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			$submenu_file = 'post.php?post=' . (int) $post->ID . '&action=edit';
		}

		// Check if we're editing a taxonomy that applies to sc_product post types.
		$screen   = get_current_screen();
		$taxonomy = get_taxonomy( $screen->taxonomy );
		if ( $screen && 'edit-tags' === $screen->base && in_array( 'sc_product', (array) $taxonomy->object_type, true ) ) {
			$file         = $this->slug;
			$submenu_file = \SureCart::taxonomies()->editLink( $screen->taxonomy, 'sc_product' ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		}

		return $file;
	}

	/**
	 * Add some divider css.
	 *
	 * @return void
	 */
	public function adminMenuCSS(): void {
		echo '<style>' . $this->familyVisibilityCSS() . '
			#toplevel_page_' . $this->slug . ' li {
				clear: both;
			}
			#toplevel_page_' . $this->slug . ' li:not(:last-child) a:has(.sc-menu-divider):after {
				border-bottom: 1px solid hsla(0,0%,100%,.2);
				display: block;
				float: left;
				margin: 13px -15px 8px;
				content: "";
				width: calc(100% + 26px);
			}
			.sc-new-badge {
				background: var(--wp-admin-theme-color, #007cba);
				color: #ffffff;
				font-size: 9px;
				font-weight: 600;
				letter-spacing: 0.5px;
				width: 6px;
				height: 6px;
				margin-top: -2px;
				margin-left: 6px;
				border-radius: 8px;
				text-transform: uppercase;
				vertical-align: middle;
				align-self: center;
				display: inline-block;
			}
		</style>';
	}

	/**
	 * Collapse inactive menu families on first paint.
	 *
	 * Children register for every page (so the unified admin app can reveal
	 * them without a reload); this hides the families the current page isn't
	 * part of, matching the old conditionally-registered menu byte for byte.
	 * The `data-sc-family` attribute is on the CSS class the JS toggles, so
	 * client-side visibility wins over this stylesheet after a swap.
	 *
	 * @return string CSS rules, or '' outside the relevant screens.
	 */
	protected function familyVisibilityCSS(): string {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		// Product taxonomy screens count as the products family, matching the
		// old registration condition.
		$taxonomy = isset( $_GET['taxonomy'] ) ? sanitize_key( wp_unslash( $_GET['taxonomy'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$active   = self::menuFamilyFor( $page );
		if ( ! $active && $taxonomy ) {
			$tax_object = get_taxonomy( $taxonomy );
			if ( $tax_object && in_array( 'sc_product', (array) $tax_object->object_type, true ) ) {
				$active = 'sc-products';
			}
		}

		$rules = array();
		foreach ( self::MENU_FAMILIES as $parent => $children ) {
			if ( $parent === $active ) {
				continue;
			}
			foreach ( $children as $child ) {
				$link = 'a[href="admin.php?page=' . esc_attr( $child ) . '"]';
				if ( $child === $parent ) {
					// The promotions parent shares the coupons slug with its
					// first child; the sibling combinator targets only the
					// later (child) item, leaving the parent visible.
					$rules[] = '#adminmenu li:has(> ' . $link . ') ~ li:not(.sc-family-open):has(> ' . $link . ')';
					continue;
				}
				$rules[] = '#adminmenu li:not(.sc-family-open):has(> ' . $link . ')';
			}
		}

		// Taxonomy links live in the products family.
		if ( 'sc-products' !== $active ) {
			$rules[] = '#toplevel_page_' . $this->slug . ' li:not(.sc-family-open):has(> a[href^="edit-tags.php"])';
		}

		return $rules ? implode( ',', $rules ) . '{ display: none; }' : '';
	}

	/**
	 * Get the menu slug.
	 *
	 * @return string
	 */
	public function getMenuSlug() {
		// Set the slug to the getting started page if the user has no API token.
		if ( ! ApiToken::get() ) {
			return 'sc-getting-started';
		}

		return $this->slug;
	}

	/**
	 * Register admin pages.
	 *
	 * @return void
	 */
	public function registerAdminPages() {
		// Get the menu slug.
		$this->slug = $this->getMenuSlug();

		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		\add_menu_page( __( 'Dashboard', 'surecart' ), __( 'SureCart', 'surecart' ), 'manage_sc_shop_settings', $this->slug, '__return_false', 'data:image/svg+xml;base64,' . base64_encode( file_get_contents( plugin_dir_path( SURECART_PLUGIN_FILE ) . 'images/icon.svg' ) ), apply_filters( 'surecart_menu_priority', 2.0001 ) );

		// not yet installed.
		if ( ! ApiToken::get() ) {
			$this->pages = array(
				'get-started'     => \add_submenu_page( $this->slug, __( 'Get Started', 'surecart' ), __( 'Get Started', 'surecart' ), 'manage_options', $this->slug, '__return_false' ),
				'complete-signup' => \add_submenu_page( '', __( 'Complete Signup', 'surecart' ), __( 'Complete Signup', 'surecart' ), 'manage_options', 'sc-complete-signup', '__return_false' ),
				'settings'        => \add_submenu_page( $this->slug, __( 'Settings', 'surecart' ), __( 'Settings', 'surecart' ), 'manage_options', 'sc-settings', '__return_false' ),
			);
			return;
		}

		$this->pages = array();

		/**
		 * Dashboard
		 */
		$this->pages += array(
			'get-started'     => \add_submenu_page( $this->slug, __( 'Dashboard', 'surecart' ), '<span class="sc-menu-divider">' . __( 'Dashboard', 'surecart' ) . '</span>', 'manage_sc_shop_settings', 'sc-dashboard', '__return_false' ),
			'complete-signup' => \add_submenu_page( '', __( 'Complete Signup', 'surecart' ), __( 'Complete Signup', 'surecart' ), 'manage_options', 'sc-complete-signup', '__return_false' ),
			'claim-account'   => \add_submenu_page( '', __( 'Claim Account', 'surecart' ), __( 'Claim Account', 'surecart' ), 'manage_options', 'sc-claim-account', '__return_false' ),
		);

		/**
		 * Orders
		 */
		$this->pages += array(
			'orders' => \add_submenu_page( $this->slug, __( 'Orders', 'surecart' ), __( 'Orders', 'surecart' ), 'edit_sc_orders', 'sc-orders', '__return_false' ),
		);
		// Orders submenu pages. Family children register on every page; the
		// visibility CSS below collapses inactive families, so the unified
		// admin app can expand them client-side without a reload.
		$this->pages += array(
			'abandoned'       => \add_submenu_page( $this->slug, __( 'Abandoned', 'surecart' ), '↳ ' . __( 'Abandoned', 'surecart' ), 'edit_sc_orders', 'sc-abandoned-checkouts', '__return_false' ),
			'invoices'        => \add_submenu_page( $this->slug, __( 'Invoices', 'surecart' ), '↳ ' . __( 'Invoices', 'surecart' ), 'edit_sc_invoices', 'sc-invoices', '__return_false' ),
			'shipping-labels' => \add_submenu_page( $this->slug, __( 'Shipping Labels', 'surecart' ), '↳ ' . __( 'Shipping Labels', 'surecart' ), 'publish_sc_orders', 'sc-shipping-labels', '__return_false' ),
		);

		/**
		 * Products
		 */
		$this->pages += array(
			'products' => \add_submenu_page( $this->slug, __( 'Products', 'surecart' ), __( 'Products', 'surecart' ), 'edit_sc_products', 'sc-products', '__return_false' ),
		);

		// Product submenu pages.
		$taxonomies = array_diff( get_object_taxonomies( 'sc_product' ), array( 'sc_account', 'sc_collection' ) );
		sort( $taxonomies, SORT_STRING ); // Sort the taxonomies alphabetically.
		$this->pages += array(
			'bundles'             => \add_submenu_page( $this->slug, __( 'Bundles', 'surecart' ), '↳ ' . __( 'Bundles', 'surecart' ) . '<span class="sc-new-badge"></span>', 'edit_sc_products', 'sc-bundles', '__return_false' ),
			'product-collections' => \add_submenu_page( $this->slug, __( 'Product Collections', 'surecart' ), '↳ ' . __( 'Collections', 'surecart' ), 'edit_sc_products', 'sc-product-collections', '__return_false' ),
		);
		if ( ! empty( $taxonomies ) && is_array( $taxonomies ) ) {
			$this->pages += array_map(
				function ( $taxonomy ) {
					if ( ! taxonomy_exists( $taxonomy ) ) {
						return null;
					}
					$taxonomy_obj = get_taxonomy( $taxonomy );
					return \add_submenu_page( $this->slug, $taxonomy_obj->label, '↳ ' . $taxonomy_obj->labels->menu_name ?? $taxonomy_obj->label, 'edit_sc_products', \SureCart::taxonomies()->editLink( $taxonomy_obj->name, 'sc_product' ), '' );
				},
				$taxonomies
			);
		}
		$this->pages += array(
			'product-groups' => \add_submenu_page( $this->slug, __( 'Upgrade Groups', 'surecart' ), '↳ ' . __( 'Upgrade Groups', 'surecart' ), 'edit_sc_products', 'sc-product-groups', '__return_false' ),
			'reviews'        => \add_submenu_page( $this->slug, __( 'Reviews', 'surecart' ), '↳ ' . __( 'Reviews', 'surecart' ), 'edit_sc_products', 'sc-reviews', '__return_false' ),
		);

		/**
		 * Promotions
		 */
		$this->pages += array(
			'promotion' => \add_submenu_page( $this->slug, __( 'Promotions', 'surecart' ), __( 'Promotions', 'surecart' ), 'edit_sc_coupons', 'sc-coupons', '__return_false' ),
		);

		// Promotions submenu pages.
		/**
		 * Coupons
		 */
		$this->pages += array(
			'coupons'  => \add_submenu_page( $this->slug, __( 'Coupons', 'surecart' ), '↳ ' . __( 'Coupons', 'surecart' ), 'edit_sc_coupons', 'sc-coupons', '__return_false' ),
			'auto_fee' => \add_submenu_page( $this->slug, __( 'Dynamic Pricing', 'surecart' ), '↳ ' . __( 'Dynamic Pricing', 'surecart' ), 'edit_sc_products', 'sc-auto-fees', '__return_false' ),
			'bumps'    => \add_submenu_page( $this->slug, __( 'Order Bumps', 'surecart' ), '↳ ' . __( 'Order Bumps', 'surecart' ), 'edit_sc_products', 'sc-bumps', '__return_false' ),
			'upsells'  => \add_submenu_page( $this->slug, __( 'Upsells', 'surecart' ), '↳ ' . __( 'Upsells', 'surecart' ), 'edit_sc_products', 'sc-upsell-funnels', '__return_false' ),
		);

		/**
		 * Licenses
		 */
		$this->pages += array(
			'licenses' => \add_submenu_page( $this->slug, __( 'Licenses', 'surecart' ), __( 'Licenses', 'surecart' ), 'edit_sc_products', 'sc-licenses', '__return_false' ),
		);

		/**
		 * Subscriptions
		 */
		$this->pages += array(
			'subscriptions' => \add_submenu_page( $this->slug, __( 'Subscriptions', 'surecart' ), __( 'Subscriptions', 'surecart' ), 'edit_sc_subscriptions', 'sc-subscriptions', '__return_false' ),
		);
		// Subscriptions family — see the note on the Orders family.
		$this->pages += array(
			'cancellations' => \add_submenu_page( $this->slug, __( 'Cancellation Insights', 'surecart' ), '↳ ' . __( 'Cancellations', 'surecart' ), 'edit_sc_subscriptions', 'sc-cancellation-insights', '__return_false' ),
		);

		$this->pages += array(
			'affiliates' => \add_submenu_page( $this->slug, __( 'Affiliates', 'surecart' ), __( 'Affiliates', 'surecart' ), 'edit_sc_affiliates', 'sc-affiliates', '__return_false' ),
		);
		// Affiliates family — see the note on the Orders family.
		$this->pages += array(
			'affiliate-requests'      => \add_submenu_page( $this->slug, __( 'Requests', 'surecart' ), '↳ ' . __( 'Requests', 'surecart' ), 'edit_sc_affiliates', 'sc-affiliate-requests', '__return_false' ),
			'affiliate-clicks'        => \add_submenu_page( $this->slug, __( 'Clicks', 'surecart' ), '↳ ' . __( 'Clicks', 'surecart' ), 'edit_sc_affiliates', 'sc-affiliate-clicks', '__return_false' ),
			'affiliate-referrals'     => \add_submenu_page( $this->slug, __( 'Referrals', 'surecart' ), '↳ ' . __( 'Referrals', 'surecart' ), 'edit_sc_affiliates', 'sc-affiliate-referrals', '__return_false' ),
			'affiliate-payouts'       => \add_submenu_page( $this->slug, __( 'Payouts', 'surecart' ), '↳ ' . __( 'Payouts', 'surecart' ), 'edit_sc_affiliates', 'sc-affiliate-payouts', '__return_false' ),
			'affiliate-payout-groups' => \add_submenu_page( ' ', __( 'Payout Groups', 'surecart' ), '', 'edit_sc_affiliates', 'sc-affiliate-payout-groups', '__return_false' ),
		);

		/**
		 * Customers
		 */
		$this->pages += array(
			'customers' => \add_submenu_page( $this->slug, __( 'Customers', 'surecart' ), '<span class="sc-menu-divider">' . __( 'Customers', 'surecart' ) . '</span>', 'edit_sc_customers', 'sc-customers', '__return_false' ),
		);

		/**
		 * Restore
		 */
		if ( 'sc-restore' === ( $_GET['page'] ?? '' ) ) {
			$this->pages += array(
				'restore' => \add_submenu_page( null, __( 'Restore', 'surecart' ), __( 'Restore', 'surecart' ), 'manage_options', 'sc-restore', '__return_false' ),
			);
		}

		$this->pages += array(
			'shop'      => $this->getPage( 'shop', __( 'Shop', 'surecart' ) ),
			'checkout'  => $this->getPage( 'checkout', __( 'Checkout', 'surecart' ) ),
			'cart'      => $this->addTemplateSubMenuPage( 'cart', __( 'Cart', 'surecart' ), 'surecart/surecart//cart' ),
			'dashboard' => $this->getPage( 'dashboard', __( 'Customer Area', 'surecart' ) ),
			'forms'     => $this->addFormsSubMenuPage(),
			'settings'  => \add_submenu_page( $this->slug, __( 'Settings', 'surecart' ), __( 'Settings', 'surecart' ), 'manage_options', 'sc-settings', '__return_false' ),
			'learn'     => get_option( 'surecart_learn_admin_menu', true ) ? \add_submenu_page( $this->slug, __( 'Learn', 'surecart' ), __( 'Learn', 'surecart' ) . $this->getLearnBadge(), 'manage_options', 'sc-learn', '__return_false' ) : null,
		);
	}

	/**
	 * Add the Checkout Forms menu item.
	 *
	 * The modern list is our own admin page; the classic list is WordPress's
	 * `edit.php` screen. The item follows the active view so the menu highlights
	 * whichever screen the user lands on.
	 *
	 * Two WordPress quirks drive the shape of this:
	 * - A callback must be registered for `admin.php?page=sc-forms` to resolve
	 *   at all (WP checks `has_action()` on the page hook), but registering one
	 *   for the `edit.php` link makes WP rewrite it as `admin.php?page=edit.php…`.
	 * - `sc-forms` still has to exist while the classic view is active, or the
	 *   URL 403s instead of reaching the controller's redirect.
	 *
	 * @return string|false The resulting page hook name.
	 */
	protected function addFormsSubMenuPage() {
		$is_enhanced = (bool) get_option( 'surecart_enhanced_admin_views', true );
		$slug        = $is_enhanced ? 'sc-forms' : 'edit.php?post_type=sc_form';

		if ( ! $is_enhanced ) {
			\add_submenu_page( '', __( 'Checkout Forms', 'surecart' ), __( 'Checkout Forms', 'surecart' ), 'edit_posts', 'sc-forms', '__return_false' );
		}

		// `edit_posts` matches the route middleware and the `sc_form` post type
		// caps — the classic `edit.php` list was always reachable by editors, so
		// the modern list (and the editor back link pointing at it) must be too.
		return \add_submenu_page(
			$this->slug,
			__( 'Checkout Forms', 'surecart' ),
			'<span class="sc-menu-divider">' . __( 'Checkout Forms', 'surecart' ) . '</span>',
			'edit_posts',
			$slug,
			$is_enhanced ? '__return_false' : ''
		);
	}

	/**
	 * Get the page link.
	 *
	 * @param string $slug The slug.
	 * @param string $name The name.
	 * @param string $post_type The post type.
	 *
	 * @return void
	 */
	public function getPage( $slug, $name, $post_type = 'page', $divider = false ) {
		// add filter to disable shop page menu item.
		if ( ! get_option( 'surecart_' . $slug . '_admin_menu', true ) ) {
			return;
		}

		$page_id = \SureCart::pages()->getId( $slug, $post_type );

		$status = '';

		$post_status = get_post_status( $page_id );
		if ( 'publish' !== $post_status ) {
			$status = '<span class="awaiting - mod">' . ( get_post_status_object( $post_status )->label ?? esc_html__( 'Deleted', 'surecart' ) ) . '</span>';
		}

		$label = $name . $status;
		if ( $divider ) {
			$label = '<span class="sc-menu-divider">' . $label . '</span>';
		}

		return \add_submenu_page( $this->slug, $name, $label, 'manage_options', $this->getSubMenuPageSlug( $slug, $page_id ), '' );
	}

	/**
	 * Get the page menu slug.
	 *
	 * @param string $slug The slug.
	 * @param int    $page_id The page id.
	 */
	public function getSubMenuPageSlug( $slug, $page_id ) {
		// check if it is not an essential page.
		if ( ! in_array( $slug, self::ESSENTIAL_PAGES, true ) ) {
			return 'post.php?post=' . $page_id . '&action=edit';
		}

		$post_status = get_post_status( $page_id );

		// check if the page is published.
		if ( 'publish' === $post_status ) {
			return 'post.php?post=' . $page_id . '&action=edit';
		}

		return 'admin.php?page=sc-restore&restore=' . $slug;
	}

	/**
	 * Add a submenu page for a template.
	 *
	 * @param string $slug The slug.
	 * @param string $name The name.
	 * @param string $template_slug The template slug.
	 *
	 * @return null|string|false
	 */
	public function addTemplateSubMenuPage( $slug, $name, $template_slug ) {
		// add filter to disable shop page menu item.
		if ( ! get_option( 'surecart_' . $slug . '_admin_menu', true ) ) {
			return;
		}

		return \add_submenu_page(
			$this->slug,
			$name,
			$name,
			'manage_options',
			add_query_arg(
				[
					'postId'   => rawurlencode( $template_slug ),
					'postType' => 'wp_template_part',
					'canvas'   => 'edit',
				],
				'site-editor.php',
			),
			''
		);
	}

	/**
	 * Select menu item.
	 *
	 * @param string $file The file.
	 *
	 * @return string
	 */
	public function applyMenuOverrides( $file ) {
		global $plugin_page;

		foreach ( self::MENU_CURRENT_OVERRIDES as $key => $value ) {
			if ( $key === $plugin_page ) {
				$plugin_page = $value; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			}
		}

		return $file;
	}

	/**
	 * Get the learn menu badge showing remaining steps count.
	 *
	 * Total is synced from JS via the surecart_learn_total_steps option.
	 *
	 * @return string
	 */
	protected function getLearnBadge() {
		$remaining = \SureCart::settings()->getLearnRemainingSteps();
		return $remaining > 0
			? sprintf( ' <span class="awaiting-mod">%d</span>', $remaining )
			: '';
	}
}
