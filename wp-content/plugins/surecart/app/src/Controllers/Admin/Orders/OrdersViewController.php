<?php

namespace SureCart\Controllers\Admin\Orders;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Orders\OrdersListTable;

/**
 * Handles order admin requests.
 */
class OrdersViewController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the legacy WP_List_Table view for orders.
	 */
	protected function renderWpListView() {
		$table = new OrdersListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'orders' => [
						'title' => __( 'Orders', 'surecart' ),
					],
				],
				'report_url'          => $this->reportUrl(),
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/orders/index' )->with(
			[
				'table' => $table,
			]
		);
	}

	/**
	 * Render the DataViews SPA view for orders.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( OrderScriptsController::class );
		return $this->renderSpaShell( 'admin/orders/spa', 'orders' );
	}

	/**
	 * Orders edit.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( OrderScriptsController::class );

		// preload some requests.
		if ( $request->query( 'id' ) ) {
			$this->preloadPaths(
				[
					'/wp/v2/users/me',
					'/wp/v2/types?context=view',
					'/wp/v2/types?context=edit',
					'/surecart/v1/orders/' . $request->query( 'id' ) . '?context=edit&expand[0]=checkout&expand[1]=checkout.charge&expand[2]=checkout.customer&expand[3]=checkout.tax_identifier&expand[4]=checkout.payment_failures&expand[5]=checkout.shipping_address&expand[6]=checkout.discount&expand[7]=checkout.line_items&expand[8]=discount.promotion&expand[9]=line_item.price&expand[10]=line_item.fees&expand[11]=customer.balances&expand[12]=price.product',
				]
			);
		}

		// The React detail component renders its own breadcrumbs, so no
		// breadcrumb is passed to the shell.
		return $this->renderSpaShell( 'admin/orders/spa' );
	}

	/**
	 * Archive orders.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function archive( $request ) {
		// flash an error message.
		\SureCart::flash()->add( 'errors', 'Please enter a valid email address.' );
		// redirect to order index page.
		return \SureCart::redirect()->to( \SureCart::getUrl()->index( 'order' ) );
	}
}
