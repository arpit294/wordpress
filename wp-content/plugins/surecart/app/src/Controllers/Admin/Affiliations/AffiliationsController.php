<?php

namespace SureCart\Controllers\Admin\Affiliations;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Affiliations\AffiliationsListTable;
use SureCart\Models\Affiliation;

/**
 * Handles Affiliation admin routes.
 */
class AffiliationsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for affiliates.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( AffiliationsScriptsController::class );
		return $this->renderSpaShell( 'admin/affiliations/spa', 'affiliates' );
	}

	/**
	 * Affiliates index.
	 */
	protected function renderWpListView() {
		$table = new AffiliationsListTable();
		$table->prepare_items();

		$this->withHeader(
			array(
				'breadcrumbs' => [
					'affiliates' => [
						'title' => __( 'Affiliates', 'surecart' ),
					],
				],
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);

		$this->withNotices(
			[
				'activated'   => __( 'Affiliation activated successfully.', 'surecart' ),
				'deactivated' => __( 'Affiliation deactivated successfully.', 'surecart' ),
			]
		);

		return \SureCart::view( 'admin/affiliations/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Edit
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( AffiliationsScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/wp/v2/types?context=view',
				'/wp/v2/types?context=edit',
				'/surecart/v1/affiliations/' . $request->query( 'id' ) . '?context=edit',
			]
		);

		// The React detail component renders its own breadcrumbs.
		return $this->renderSpaShell( 'admin/affiliations/spa' );
	}

	/**
	 * Activate the affiliation.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 *
	 * @return \SureCartCore\Requests\RequestInterface
	 */
	public function activate( $request ) {
		$activated = Affiliation::activate( $request->query( 'id' ) );

		if ( is_wp_error( $activated ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $activated->get_error_messages() ) ) );
		}

		return \SureCart::redirect()->to( add_query_arg( [ 'activated' => true ], \SureCart::getUrl()->index( 'affiliates' ) ) );
	}

	/**
	 * Deactivate the affiliation.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 *
	 * @return \SureCartCore\Requests\RequestInterface
	 */
	public function deactivate( $request ) {
		$deactivated = Affiliation::deactivate( $request->query( 'id' ) );

		if ( is_wp_error( $deactivated ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $deactivated->get_error_messages() ) ) );
		}

		return \SureCart::redirect()->to( add_query_arg( [ 'deactivated' => true ], \SureCart::getUrl()->index( 'affiliates' ) ) );
	}
}
