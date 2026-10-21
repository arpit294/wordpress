<?php

namespace SureCart\Controllers\Admin\Coupons;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Coupons\CouponsListTable;

/**
 * Handles coupon admin requests.
 */
class CouponsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the legacy WP_List_Table view for coupons.
	 */
	protected function renderWpListView() {
		$table = new CouponsListTable();
		$table->prepare_items();

		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'coupons' => [
						'title' => __( 'Coupons', 'surecart' ),
					],
				],
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);

		return \SureCart::view( 'admin/coupons/index' )->with(
			[
				'table' => $table,
			]
		);
	}

	/**
	 * Render the DataViews SPA view for coupons.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( CouponScriptsController::class );
		return $this->renderSpaShell( 'admin/coupons/spa', 'coupons' );
	}

	/**
	 * Coupons edit.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function edit( $request ) {
		// admin edit page.
		do_action( 'surecart/admin/coupons/edit' );
		// enqueue needed script.
		$this->enqueueSpaScripts( CouponScriptsController::class );

		if ( $request->query( 'id' ) ) {
			$this->preloadPaths(
				[
					'/wp/v2/users/me',
					'/wp/v2/types?context=view',
					'/wp/v2/types?context=edit',
					// Expand promotions to match the list — the list and detail
					// share one core-data record, so a lean detail fetch would
					// blank the list's Code column on return.
					'/surecart/v1/coupons/' . $request->query( 'id' ) . '?context=edit&expand%5B0%5D=promotions',
				]
			);
		}

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/coupons/spa' );
	}
}
