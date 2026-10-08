<?php
// phpcs:ignore WordPress.Security.NonceVerification.Recommended
$active_tab    = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'all';
$is_pending    = 'pending_labels' === $active_tab;
$total_items   = (int) $table->get_pagination_arg( 'total_items' );
$showing_count = $is_pending
	? sprintf(
		// translators: %s: total number of pending shipments.
		_n( '%s pending shipment', '%s pending shipments', $total_items, 'surecart' ),
		number_format_i18n( $total_items )
	)
	: sprintf(
		// translators: %s: total number of orders.
		_n( '%s order', '%s orders', $total_items, 'surecart' ),
		number_format_i18n( $total_items )
	);
?>
<div class="wrap">
	<?php \SureCart::render( 'layouts/partials/admin-index-styles' ); ?>

	<style>
		/* Rendered AFTER admin-index-styles so these win by source order:
		   the new columns inherit nothing from that partial, and its 200px
		   `.column-order` was sized for the Orders two-line variant — too
		   wide here. Size `.column-status` for the All-tab dual-badge case. */
		.column-order {
			width: 90px;
		}
		.column-status {
			min-width: 150px;
		}
		.column-items {
			width: 60px;
		}
		.column-created {
			width: 120px;
		}
		.column-ship_to {
			min-width: 180px;
		}
		.column-status > div,
		.sc-status-badges {
			display: flex;
			align-items: center;
			gap: 6px;
			flex-wrap: wrap;
		}
		.sc-shipping-labels-count {
			margin: 4px 0 0;
			color: var(--sc-color-gray-700, #555);
			font-size: 13px;
		}
	</style>

	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title' => __( 'Shipping Labels', 'surecart' ),
		]
	);
	?>

	<p class="sc-shipping-labels-count"><?php echo esc_html( $showing_count ); ?></p>

	<?php $table->search_form( __( 'Search Orders', 'surecart' ), 'sc-search-shipping-labels' ); ?>

	<form id="shipping-labels-filter" method="get">
		<input type="hidden" name="page" value="sc-shipping-labels" />
		<?php $table->views(); ?>
		<?php $table->display(); ?>
	</form>

	<div id="sc-shipping-labels-bulk-drawer"></div>
</div>
