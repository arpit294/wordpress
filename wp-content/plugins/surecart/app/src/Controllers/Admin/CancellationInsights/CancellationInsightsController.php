<?php

namespace SureCart\Controllers\Admin\CancellationInsights;

use SureCart\Controllers\Admin\CancellationInsights\CancellationInsightsListTable;
use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;

/**
 * Handles cancellation insights (cancellation acts) admin requests.
 */
class CancellationInsightsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Whether subscription preservation (cancellation insights) is entitled.
	 *
	 * @return bool
	 */
	protected function isEntitled(): bool {
		return (bool) ( \SureCart::account()->entitlements->subscription_preservation ?? false );
	}

	/**
	 * Render the legacy WP_List_Table view for cancellation insights.
	 */
	protected function renderWpListView() {
		$header = array(
			'breadcrumbs' => [
				'subscriptions' => [
					'title' => $this->pageTitle(),
				],
			],
			'report_url'  => $this->reportUrl(),
		);

		// Only offer the modern-view toggle when the account is entitled — an
		// unentitled account can never reach the DataViews list for this page,
		// so a "switch view" control would be misleading.
		if ( $this->isEntitled() ) {
			$header['enhanced_view_promo'] = $this->currentAdminPageUrl();
		}

		$this->withHeader( $header );

		$table = new CancellationInsightsListTable();
		$table->prepare_items();
		return \SureCart::view( 'admin/cancellation-insights/index' )->with(
			[
				'table'   => $table,
				'enabled' => $this->isEntitled(),
			]
		);
	}

	/**
	 * Render the DataViews SPA view for cancellation insights.
	 *
	 * When the account isn't entitled there's no data to show, so fall back to
	 * the classic view which renders the upgrade CTA banner.
	 */
	protected function renderSpaView() {
		if ( ! $this->isEntitled() ) {
			return $this->renderWpListView();
		}

		$this->enqueueSpaScripts( CancellationInsightsScriptsController::class );
		return $this->renderSpaShell( 'admin/cancellation-insights/spa', 'subscriptions' );
	}
}
