<?php

namespace SureCart\Controllers\Admin\AffiliationPayouts;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Models\Payout;

/**
 * Handles affiliate payout admin routes.
 */
class AffiliationPayoutsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for affiliate payouts.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( AffiliationPayoutsScriptsController::class );
		return $this->renderSpaShell( 'admin/affiliation-payouts/spa', 'affiliate_payouts' );
	}


	/**
	 * Affiliate Payout index.
	 */
	protected function renderWpListView() {
		$table = new AffiliationPayoutsListTable();
		$table->prepare_items();

		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'affiliate_payouts' => [
						'title' => $this->pageTitle(),
					],
				],
				'report_url'          => $this->reportUrl(),
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);

		$this->withNotices(
			array(
				'processing' => __( 'Affiliate payout marked processing.', 'surecart' ),
				'completed'  => __( 'Affiliate payout marked completed.', 'surecart' ),
				'deleted'    => __( 'Affiliate payout deleted.', 'surecart' ),
			)
		);

		return \SureCart::view( 'admin/affiliation-payouts/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Edit an affiliate payout.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return string
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( AffiliationPayoutsScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/wp/v2/types?context=view',
				'/wp/v2/types?context=edit',
				'/surecart/v1/payouts/' . $request->query( 'id' ) . '?context=edit',
			]
		);

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/affiliation-payouts/spa' );
	}

	/**
	 * Delete an affiliate payout.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return \SureCartCore\Responses\RedirectResponse
	 */
	public function delete( $request ) {
		$deleted = Payout::delete( $request->query( 'id' ) );

		if ( is_wp_error( $deleted ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $deleted->get_error_messages() ) ) );
		}

		return \SureCart::redirect()->to( add_query_arg( array( 'deleted' => true ), \SureCart::getUrl()->index( 'affiliate-payouts' ) ) );
	}

	/**
	 * Complete an affiliate payout.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return \SureCartCore\Responses\RedirectResponse
	 */
	public function complete( $request ) {
		$completed = Payout::complete( $request->query( 'id' ) );

		if ( is_wp_error( $completed ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $completed->get_error_messages() ) ) );
		}

		return \SureCart::redirect()->to( add_query_arg( array( 'completed' => true ), \SureCart::getUrl()->index( 'affiliate-payouts' ) ) );
	}

	/**
	 * Make an affiliate payout processing.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return \SureCartCore\Responses\RedirectResponse
	 */
	public function makeProcessing( $request ) {
		$processed = Payout::make_processing( $request->query( 'id' ) );

		if ( is_wp_error( $processed ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $processed->get_error_messages() ) ) );
		}

		return \SureCart::redirect()->to( add_query_arg( array( 'processing' => true ), \SureCart::getUrl()->index( 'affiliate-payouts' ) ) );
	}
}
