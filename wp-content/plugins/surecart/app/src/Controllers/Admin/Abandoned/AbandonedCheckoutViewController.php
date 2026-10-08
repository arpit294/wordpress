<?php

namespace SureCart\Controllers\Admin\Abandoned;

use SureCart\Controllers\Admin\Abandoned\AbandonedCheckoutListTable;
use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;

/**
 * Handles abandoned checkout admin requests.
 */
class AbandonedCheckoutViewController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Whether abandoned checkouts are enabled for this account.
	 *
	 * @return bool
	 */
	protected function isEntitled(): bool {
		return (bool) ( \SureCart::account()->entitlements->abandoned_checkouts ?? false );
	}

	/**
	 * Render the legacy WP_List_Table view for abandoned checkouts.
	 */
	protected function renderWpListView() {
		$header = array(
			'breadcrumbs' => [
				'orders' => [
					'title' => __( 'Abandoned Checkouts', 'surecart' ),
				],
			],
			'report_url'  => $this->reportUrl(),
		);

		// Only offer the modern-view toggle when entitled — otherwise the page
		// can never render the DataViews list, so the toggle would mislead.
		if ( $this->isEntitled() ) {
			$header['enhanced_view_promo'] = $this->currentAdminPageUrl();
		}

		$this->withHeader( $header );

		$table = new AbandonedCheckoutListTable();
		$table->prepare_items();
		return \SureCart::view( 'admin/abandoned-orders/index' )->with(
			[
				'table'   => $table,
				'enabled' => $this->isEntitled(),
			]
		);
	}

	/**
	 * Render the DataViews SPA view for abandoned checkouts.
	 *
	 * When the account isn't entitled there's no data to show, so fall back to
	 * the classic view which renders the upgrade CTA banner.
	 */
	protected function renderSpaView() {
		if ( ! $this->isEntitled() ) {
			return $this->renderWpListView();
		}

		$this->enqueueSpaScripts( AbandonedCheckoutScriptsController::class );
		return $this->renderSpaShell( 'admin/abandoned-orders/spa', 'orders' );
	}

	/**
	 * Edit abandoned checkout.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( AbandonedCheckoutScriptsController::class );

		if ( $request->query( 'id' ) ) {
			$this->preloadPaths(
				[
					'/wp/v2/settings',
					'/wp/v2/users/me',
					'/wp/v2/types?context=view',
					'/wp/v2/types?context=edit',
					'/surecart/v1/abandoned_checkouts/' . $request->query( 'id' ) . '?context=edit&expand%5B0%5D=promotion&expand%5B1%5D=promotion.coupon&expand%5B2%5D=recovered_checkout&expand%5B3%5D=checkout&expand%5B4%5D=customer&expand%5B5%5D=checkout.tax_identifier&expand%5B6%5D=checkout.shipping_address&expand%5B7%5D=checkout.discount&expand%5B8%5D=checkout.line_items&expand%5B9%5D=discount.promotion&expand%5B10%5D=line_item.price&expand%5B11%5D=line_item.fees&expand%5B12%5D=customer.balances&expand%5B13%5D=price.product',
				]
			);
		}

		// The React detail component renders its own breadcrumbs, so no
		// breadcrumb is passed to the shell.
		return $this->renderSpaShell( 'admin/abandoned-orders/spa' );
	}
}
