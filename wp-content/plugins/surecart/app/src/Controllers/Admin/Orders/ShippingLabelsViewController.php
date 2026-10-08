<?php

namespace SureCart\Controllers\Admin\Orders;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;

/**
 * Bulk shipping labels admin page.
 */
class ShippingLabelsViewController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the SPA view (dataviews list + bulk shipping drawer).
	 *
	 * @return \SureCartCore\Responses\ResponseInterface
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( ShippingLabelsScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/surecart/v1/warehouses?expand[0]=contact&expand[1]=contact.address&per_page=100',
				'/surecart/v1/parcel_templates?per_page=100',
				'/surecart/v1/shipping_provider_types?per_page=100',
			]
		);

		return $this->renderSpaShell( 'admin/shipping-labels/spa', 'shipping-labels' );
	}

	/**
	 * Flag-off classic view — a `WP_List_Table` plus a React island that
	 * opens the same bulk-shipping drawer as the SPA, so it preloads the
	 * same drawer-critical paths.
	 *
	 * @return \SureCartCore\Responses\ResponseInterface
	 */
	protected function renderWpListView() {
		$this->enqueueSpaScripts( ShippingLabelsClassicScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me',
				'/surecart/v1/warehouses?expand[0]=contact&expand[1]=contact.address&per_page=100',
				'/surecart/v1/parcel_templates?per_page=100',
				'/surecart/v1/shipping_provider_types?per_page=100',
			]
		);

		$table = new ShippingLabelsListTable();
		$table->prepare_items();

		$this->withHeader(
			array(
				'breadcrumbs'         => array(
					'shipping-labels' => array(
						'title' => __( 'Shipping Labels', 'surecart' ),
					),
				),
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);

		return \SureCart::view( 'admin/shipping-labels/index' )->with( [ 'table' => $table ] );
	}
}
