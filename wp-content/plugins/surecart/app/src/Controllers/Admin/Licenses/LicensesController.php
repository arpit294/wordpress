<?php

namespace SureCart\Controllers\Admin\Licenses;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Licenses\LicensesListTable;

/**
 * Handles license admin requests.
 */
class LicensesController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the legacy WP_List_Table view for licenses.
	 */
	protected function renderWpListView() {
		$table = new LicensesListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'licenses' => [
						'title' => __( 'Licenses', 'surecart' ),
					],
				],
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/licenses/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Render the DataViews SPA view for licenses.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( LicensesScriptsController::class );
		return $this->renderSpaShell( 'admin/licenses/spa', 'licenses' );
	}

	/**
	 * Licenses edit.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( LicensesScriptsController::class );

		if ( $request->query( 'id' ) ) {
			$this->preloadPaths(
				[
					'/wp/v2/users/me',
					'/wp/v2/types?context=view',
					'/wp/v2/types?context=edit',
					'/surecart/v1/licenses/' . $request->query( 'id' ) . '?context=edit&expand%5B0%5D=purchase&expand%5B1%5D=purchase.customer&expand%5B2%5D=purchase.product',
				]
			);
		}

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/licenses/spa' );
	}
}
