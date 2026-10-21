<?php

namespace SureCart\Controllers\Admin\Bumps;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Bumps\BumpsListTable;

/**
 * Handles product admin requests.
 */
class BumpsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for order bumps.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( BumpScriptsController::class );
		return $this->renderSpaShell( 'admin/bumps/spa', 'bumps' );
	}

	/**
	 * Render the legacy WP_List_Table view for order bumps.
	 */
	protected function renderWpListView() {
		$table = new BumpsListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'bumps' => [
						'title' => $this->pageTitle(),
					],
				],
				'report_url'          => $this->reportUrl(),
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/bumps/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Edit
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( BumpScriptsController::class );

		if ( $request->query( 'id' ) ) {
			$this->preloadPaths(
				[
					'/wp/v2/users/me',
					'/wp/v2/types?context=view',
					'/wp/v2/types?context=edit',
					// Expand price + product to match the list — they share one
					// core-data record, so a lean detail fetch would blank the
					// list's Price column on return.
					'/surecart/v1/bumps/' . $request->query( 'id' ) . '?context=edit&expand%5B0%5D=price&expand%5B1%5D=price.product',
				]
			);
		}

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/bumps/spa' );
	}
}
