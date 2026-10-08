<?php

namespace SureCart\Controllers\Admin;

use SureCart\WordPress\Admin\AdminPageRegistry;

/**
 * Shared plumbing for admin pages that dual-render between the new React
 * DataViews SPA and the legacy WP_List_Table controller.
 *
 * Consumers implement `renderSpaView()` and `renderWpListView()`; the trait
 * owns the feature-flag check, `index()` routing, and SPA-shell rendering.
 */
trait RendersEnhancedAdminView {
	/**
	 * Render the SPA shell view for this admin page.
	 *
	 * Must enqueue the scripts controller and return the shell response
	 * — typically by calling `renderSpaShell()`.
	 *
	 * @return \SureCartCore\Responses\ResponseInterface
	 */
	abstract protected function renderSpaView();

	/**
	 * Render the legacy WP_List_Table view for this admin page.
	 *
	 * @return \SureCartCore\Responses\ResponseInterface
	 */
	abstract protected function renderWpListView();

	/**
	 * Render the appropriate view based on the `surecart_enhanced_admin_views` feature flag.
	 */
	public function index() {
		return $this->isEnhancedAdminViewsEnabled() ? $this->renderSpaView() : $this->renderWpListView();
	}

	/**
	 * Enqueue the SPA bundle on admin_enqueue_scripts.
	 *
	 * @param string $scripts_controller FQN of the scripts controller (ProductScriptsController::class etc.).
	 * @return void
	 */
	protected function enqueueSpaScripts( string $scripts_controller ): void {
		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( $scripts_controller, 'enqueue' ) );
	}

	/**
	 * Render the SPA shell view, optionally with a breadcrumb header.
	 *
	 * Pass a breadcrumb key for list views; omit it for edit/create views, whose
	 * React components render their own breadcrumbs.
	 *
	 * @param string      $view           View slug passed to \SureCart::view().
	 * @param string|null $breadcrumb_key Breadcrumb array key (e.g. 'products').
	 * @param string|null $title          Overrides `AdminPageRegistry::pageTitle()`.
	 *
	 * @return \SureCartCore\Responses\ResponseInterface
	 */
	protected function renderSpaShell( string $view, ?string $breadcrumb_key = null, ?string $title = null ) {
		$header = [
			'enhanced_view_promo' => $this->currentAdminPageUrl(),
			'report_url'          => $this->reportUrl(),
		];

		if ( null !== $breadcrumb_key ) {
			$header['breadcrumbs'] = [
				$breadcrumb_key => [ 'title' => $title ?? $this->pageTitle() ],
			];
		} else {
			// Hidden, not omitted: a client-side swap to a list reveals it.
			$header['breadcrumbs'] = [
				[ 'title' => get_admin_page_title() ],
			];
			$header['hidden']      = true;
		}

		$this->withHeader( $header );

		return \SureCart::view( $view );
	}

	/**
	 * Current admin page slug from the query string, or ''.
	 *
	 * @return string
	 */
	private function currentAdminPageSlug(): string {
		return AdminPageRegistry::currentSlug();
	}

	/**
	 * Where the view toggle returns to after switching views on this page.
	 *
	 * @return string
	 */
	protected function currentAdminPageUrl(): string {
		$page = $this->currentAdminPageSlug();
		return $page ? AdminPageRegistry::classicViewUrl( $page ) : admin_url();
	}

	/**
	 * Canonical title of this page.
	 *
	 * @return string
	 */
	protected function pageTitle(): string {
		return AdminPageRegistry::pageTitle( $this->currentAdminPageSlug() );
	}

	/**
	 * Reports dashboard URL for this page, or '' when it has none.
	 *
	 * @return string
	 */
	protected function reportUrl(): string {
		return AdminPageRegistry::reportUrl( $this->currentAdminPageSlug() );
	}

	/**
	 * Whether the React DataViews experience is enabled.
	 *
	 * @return bool
	 */
	public function isEnhancedAdminViewsEnabled(): bool {
		return (bool) get_option( 'surecart_enhanced_admin_views', true );
	}
}
