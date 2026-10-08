<?php

namespace SureCart\Controllers\Admin\AffiliationRequests;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\AffiliationRequests\AffiliationRequestsListTable;

/**
 * Handles affiliate requests admin routes.
 */
class AffiliationRequestsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for affiliate requests.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( AffiliationRequestsScriptsController::class );
		return $this->renderSpaShell( 'admin/affiliation-requests/spa', 'affiliate-requests' );
	}

	/**
	 * Affiliate Requests index.
	 */
	protected function renderWpListView() {
		$table = new AffiliationRequestsListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs' => [
					'affiliate-requests' => [
						'title' => __( 'Affiliate Requests', 'surecart' ),
					],
				],
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/affiliation-requests/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Edit
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( AffiliationRequestsScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/wp/v2/types?context=view',
				'/wp/v2/types?context=edit',
				'/surecart/v1/affiliation_requests/' . $request->query( 'id' ) . '?context=edit',
			]
		);

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/affiliation-requests/spa' );
	}
}
