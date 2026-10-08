<?php

namespace SureCart\Controllers\Admin\AffiliationPayoutGroups;

use SureCart\Controllers\Admin\AdminController;

/**
 * Handles affiliate payout groups admin routes.
 */
class AffiliationPayoutGroupsController extends AdminController {
	/**
	 * Payout batches have no list of their own, so the action-less URL
	 * belongs to Payouts, where they are listed.
	 *
	 * @return void
	 */
	public function index(): void {
		wp_safe_redirect( admin_url( 'admin.php?page=sc-affiliate-payouts' ) );
		exit;
	}

	/**
	 * Edit an affiliate payout group.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return string
	 */
	public function edit( $request ) {
		// enqueue needed script.
		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( AffiliationPayoutGroupsScriptsController::class, 'enqueue' ) );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/wp/v2/types?context=view',
				'/wp/v2/types?context=edit',
				'/surecart/v1/payout_groups/' . $request->query( 'id' ) . '?context=edit',
			]
		);

		// return view.
		return '<div id="sc-affiliate-payout-groups-app"></div>';
	}
}
