<?php

namespace SureCart\Controllers\Admin\AffiliationClicks;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;

/**
 * Handles affiliate clicks admin routes.
 */
class AffiliationClicksController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for affiliate clicks.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( AffiliationClicksScriptsController::class );
		return $this->renderSpaShell( 'admin/affiliation-clicks/spa', 'affiliate_clicks' );
	}

	/**
	 * Affiliate Clicks index.
	 */
	protected function renderWpListView() {
		$table = new AffiliationClicksListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs' => [
					'affiliate_clicks' => [
						'title' => __( 'Clicks', 'surecart' ),
					],
				],
				'report_url'  => $this->reportUrl(),
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/affiliation-clicks/index' )->with( [ 'table' => $table ] );
	}
}
