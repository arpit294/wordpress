<?php

namespace SureCart\Controllers\Admin\Dashboard;

use SureCart\Controllers\Admin\AdminController;

/**
 * Handles dashboard admin requests.
 */
class DashboardController extends AdminController {

	/**
	 * Dashboard index.
	 */
	public function index() {
		// enqueue needed script.
		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( DashboardScriptsController::class, 'enqueue' ) );

		// The dashboard renders its own header bar, but the standard admin
		// header must still exist (hidden) in the document — the unified
		// shell can swap this page to a list client-side, and lists show it.
		$this->withHeader(
			[
				'breadcrumbs' => [
					[ 'title' => __( 'Dashboard', 'surecart' ) ],
				],
				'hidden'      => true,
			]
		);

		// return view.
		return '<div id="sc-dashboard-app"></div>';
	}
}
