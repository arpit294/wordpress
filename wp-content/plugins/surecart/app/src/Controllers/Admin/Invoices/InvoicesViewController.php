<?php

namespace SureCart\Controllers\Admin\Invoices;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Controllers\Admin\Invoices\InvoicesListTable;
use SureCart\Models\Invoice;

/**
 * Handles invoice admin requests.
 */
class InvoicesViewController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the legacy WP_List_Table view for invoices.
	 */
	protected function renderWpListView() {
		$table = new InvoicesListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs'         => [
					'invoices' => [
						'title' => __( 'Invoices', 'surecart' ),
					],
				],
				'test_mode_toggle'    => true,
				'enhanced_view_promo' => $this->currentAdminPageUrl(),
			)
		);
		return \SureCart::view( 'admin/invoices/index' )->with(
			[
				'table' => $table,
			]
		);
	}

	/**
	 * Render the DataViews SPA view for invoices.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( InvoiceScriptsController::class );
		return $this->renderSpaShell( 'admin/invoices/spa', 'invoices' );
	}

	/**
	 * Edit the invoice.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 */
	public function edit( $request ) {
		// enqueue needed script.
		$this->enqueueSpaScripts( InvoiceScriptsController::class );

		$invoice = null;
		if ( $request->query( 'id' ) ) {
			$invoice = Invoice::with(
				[
					'checkout',
					'checkout.line_items',
					'line_item.price',
					'line_item.fees',
					'line_item.variant',
					'price.product',
					'product.featured_product_media',
					'product_media.media',
					'checkout.customer',
					'customer.shipping_address',
					'customer.billing_address',
					'checkout.payment_intent',
					'checkout.discount',
					'discount.promotion',
					'discount.coupon',
					'checkout.shipping_address',
					'checkout.billing_address',
					'checkout.shipping_choices',
					'shipping_choices.shipping_method',
					'payment_method.card',
					'checkout.tax_identifier',
					'checkout.order',
					'checkout.payment_method',
					'checkout.manual_payment_method',
				]
			)->find( $request->query( 'id' ) );

			if ( is_wp_error( $invoice ) ) {
				wp_die( implode( ' ', array_map( 'esc_html', $invoice->get_error_messages() ) ) );
			}
		}

		if ( ! empty( $invoice ) ) {
			$this->preloadPaths(
				[
					'/surecart/v1/invoices/' . $invoice->id . '?context=edit',
				]
			);
		}

		// The React detail component renders its own breadcrumbs, so no
		// breadcrumb is passed to the shell.
		return $this->renderSpaShell( 'admin/invoices/spa' );
	}

	/**
	 * Create invoice and redirect to edit page.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 *
	 * @return void
	 */
	public function create( $request ): void {
		$live_mode = isset( $_GET['live_mode'] ) ? rest_sanitize_boolean( $_GET['live_mode'] ) : true; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$live_mode = $live_mode ? 'true' : 'false';

		$invoice = Invoice::create(
			[
				'live_mode' => $live_mode,
			]
		);

		if ( is_wp_error( $invoice ) ) {
			wp_die( $invoice->get_error_message() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		wp_safe_redirect(
			admin_url( 'admin.php?page=sc-invoices&action=edit&id=' . $invoice->id . '&live_mode=' . $live_mode )
		);
		exit;
	}
}
