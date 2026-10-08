<?php

namespace SureCart\Controllers\Admin\Orders;

use SureCart\Models\Collection;
use SureCart\Models\Order;
use SureCart\Models\Shipment;
use SureCart\Controllers\Admin\Tables\ListTable;

/**
 * WP_List_Table for the classic Shipping Labels view.
 *
 * Two tabs share one table: "All" queries `/orders` (checkbox value is an
 * order id), "Pending" queries `/shipments` (checkbox value is a shipment
 * id). The React island hydrates the checked ids into the bulk drawer.
 */
class ShippingLabelsListTable extends ListTable {
	/**
	 * Selectable rows.
	 *
	 * @var bool
	 */
	public $checkbox = true;

	/**
	 * The active tab, sanitized and allow-listed.
	 *
	 * @return string Either `all` or `pending_labels`.
	 */
	protected function getActiveTab(): string {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'all';
		return in_array( $tab, [ 'all', 'pending_labels' ], true ) ? $tab : 'all';
	}

	/**
	 * Whether the "Pending labels" tab is active.
	 *
	 * @return bool
	 */
	protected function isPendingTab(): bool {
		return 'pending_labels' === $this->getActiveTab();
	}

	/**
	 * Prepare the items for the table to process.
	 *
	 * @return void
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array( $columns, $hidden, $sortable );

		$collection = $this->table_data();
		if ( is_wp_error( $collection ) ) {
			$this->items = [];
			return;
		}

		$this->items = $collection->data;

		// `table_data()` drops non-actionable orders, so the server count
		// over-reports. Show the filtered count, but pass `total_pages`
		// explicitly so WP_List_Table doesn't recompute it from the smaller
		// count and hide pages.
		$per_page     = $this->get_items_per_page( 'shipping_labels', 20 );
		$server_count = (int) ( $collection->pagination->count ?? 0 );

		$this->set_pagination_args(
			[
				'total_items' => count( $this->items ),
				'total_pages' => max( 1, (int) ceil( $server_count / max( 1, $per_page ) ) ),
				'per_page'    => $per_page,
			]
		);
	}

	/**
	 * Tab links, without count badges.
	 *
	 * @return array
	 */
	protected function get_views() {
		$tabs        = [
			'all'            => __( 'All', 'surecart' ),
			'pending_labels' => __( 'Pending', 'surecart' ),
		];
		$active      = $this->getActiveTab();
		$base        = admin_url( 'admin.php?page=sc-shipping-labels' );
		$tab_links   = [];

		foreach ( $tabs as $tab => $label ) {
			$link    = esc_url( add_query_arg( 'tab', $tab, $base ) );
			$current = $tab === $active ? ' class="current" aria-current="page"' : '';

			$tab_links[ $tab ] = "<a href='$link'$current>" . esc_html( $label ) . '</a>';
		}

		return $tab_links;
	}

	/**
	 * Define the columns to use in the listing table.
	 *
	 * @return array
	 */
	public function get_columns() {
		return [
			'cb'       => '<input type="checkbox" />',
			'order'    => __( 'Order', 'surecart' ),
			'status'   => __( 'Status', 'surecart' ),
			'customer' => __( 'Customer', 'surecart' ),
			'items'    => __( 'Items', 'surecart' ),
			'ship_to'  => __( 'Ship to', 'surecart' ),
			'created'  => __( 'Date', 'surecart' ),
			'mode'     => '',
		];
	}

	/**
	 * Define the sortable columns.
	 *
	 * @return array
	 */
	public function get_sortable_columns() {
		return [
			'created' => [ 'created_at', false ],
		];
	}

	/**
	 * Checkbox column. Value is the order id on the All tab, the shipment
	 * id on the Pending tab.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return void
	 */
	public function column_cb( $item ) {
		$value = $this->isPendingTab() ? ( $item->id ?? '' ) : ( $this->resolveOrder( $item )->id ?? '' );

		// Unique per-row screen reader label so rows are distinguishable.
		if ( $this->isPendingTab() ) {
			$label = sprintf(
				// translators: %s: shipment id.
				__( 'Select shipment %s', 'surecart' ),
				$value
			);
		} else {
			$order  = $this->resolveOrder( $item );
			$number = $order ? ( $order->number ?? $order->id ) : $value;
			$label  = sprintf(
				// translators: %s: order number.
				__( 'Select order %s', 'surecart' ),
				$number
			);
		}
		?>
		<label class="screen-reader-text" for="cb-select-<?php echo esc_attr( $value ); ?>"><?php echo esc_html( $label ); ?></label>
		<input id="cb-select-<?php echo esc_attr( $value ); ?>" type="checkbox" name="ids[]" value="<?php echo esc_attr( $value ); ?>" />
		<?php
	}

	/**
	 * Get the table data, branching by tab.
	 *
	 * @return \SureCart\Models\Collection|\WP_Error
	 */
	protected function table_data() {
		$per_page = $this->get_items_per_page( 'shipping_labels', 20 );

		// Sort goes in where() — Model::paginate() discards a `sort` argument.
		$conditions = [];
		$orderby    = $this->get_orderby();
		$order      = $this->get_order();
		$map        = $this->get_sort_map();
		if ( $orderby && isset( $map[ $orderby ] ) ) {
			$conditions['sort'] = $map[ $orderby ] . ':' . $order;
		}

		if ( $this->isPendingTab() ) {
			// Array `status` serializes as a repeating param the platform reads
			// as an IN-set. No `query` — the shipments endpoint has no search.
			return Shipment::where(
				array_merge(
					[ 'status' => [ 'draft', 'quoted' ] ],
					$conditions
				)
			)->with(
				[
					'fulfillment',
					'fulfillment.fulfillment_items',
					'fulfillment.order',
					'shipment.to_contact',
					'contact.address',
				]
			)->paginate(
				[
					'page'     => $this->get_pagenum(),
					'per_page' => $per_page,
				]
			);
		}

		$collection = Order::where(
			array_merge(
				[
					'status'             => [ 'paid' ],
					'fulfillment_status' => [ 'unfulfilled', 'partially_fulfilled', 'fulfilled' ],
					'shipment_status'    => [ 'unshipped', 'partially_shipped' ],
					'query'              => $this->get_search_query(),
				],
				$conditions
			)
		)->with(
			[
				'checkout',
				'checkout.customer',
				'checkout.shipping_address',
				'checkout.line_items',
				'line_item.price',
				'price.product',
				'fulfillments',
				'fulfillment.shipments',
			]
		)->paginate(
			[
				'page'     => $this->get_pagenum(),
				'per_page' => $per_page,
			]
		);

		if ( is_wp_error( $collection ) ) {
			return $collection;
		}

		// A `fulfilled` order with no pending-label shipment has no shippable
		// work left, so hide it to match the modern DataView. Per-page filter
		// only — pagination totals stay server-based. Rebuilt through the
		// constructor because `$collection->data = …` would fatal via __set.
		$rows = array_values(
			array_filter(
				$collection->data ?? [],
				function ( $order ) {
					if ( ! is_object( $order ) ) {
						return false;
					}
					return ! ( 'fulfilled' === ( $order->fulfillment_status ?? '' ) && ! $this->hasPendingLabelShipment( $order ) );
				}
			)
		);

		return new Collection(
			[
				'data'       => $rows,
				'pagination' => $collection->pagination,
			]
		);
	}

	/**
	 * Resolve the row's order — the row itself on the All tab,
	 * `fulfillment.order` on the Pending tab.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return object|null
	 */
	private function resolveOrder( $item ): ?object {
		if ( ! $this->isPendingTab() ) {
			return is_object( $item ) ? $item : null;
		}

		if ( is_object( $item->fulfillment ?? null ) && is_object( $item->fulfillment->order ?? null ) ) {
			return $item->fulfillment->order;
		}

		return null;
	}

	/**
	 * Order column — `#number` link to the order edit screen.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return string
	 */
	public function column_order( $item ) {
		$order = $this->resolveOrder( $item );
		if ( ! $order ) {
			return '-';
		}

		$number = $order->number ?? $order->id;
		ob_start();
		?>
		<a class="row-title" aria-label="<?php esc_attr_e( 'Edit Order', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'order', $order->id ) ); ?>">
			#<?php echo esc_html( $number ); ?>
		</a>
		<?php
		return ob_get_clean();
	}

	/**
	 * Shipment statuses with no label left to purchase. Mirrors
	 * `DONE_SHIPMENT_STATUSES` in packages/admin/shipping-labels/utils.js.
	 *
	 * @var string[]
	 */
	const DONE_SHIPMENT_STATUSES = [
		'purchased',
		'label_purchased',
		'voided',
		'shipped',
		'in_transit',
		'delivered',
		'returned',
		'failed',
	];

	/**
	 * Fulfillment-status tag map for the All tab. Mirrors the canonical
	 * vocabulary in packages/components/src/components/ui/order-fulfillment-badge/sc-order-fulfillment-badge.tsx,
	 * used via `ScOrderFulfillmentBadge` on both the Orders list and the
	 * modern Shipping Labels DataView (packages/admin/shipping-labels/list/fields/status.js).
	 *
	 * @return array<string, array{type: string, label: string}>
	 */
	protected function getFulfillmentTags(): array {
		return [
			'unfulfilled'         => [
				'type'  => 'warning',
				'label' => __( 'Unfulfilled', 'surecart' ),
			],
			'partially_fulfilled' => [
				'type'  => 'warning',
				'label' => __( 'Partially Fulfilled', 'surecart' ),
			],
			'fulfilled'           => [
				'type'  => 'success',
				'label' => __( 'Fulfilled', 'surecart' ),
			],
		];
	}

	/**
	 * Whether an order has a shipment still awaiting a label — no
	 * `label_url` and a non-terminal status. Mirrors
	 * `isPendingLabelShipment` in packages/admin/shipping-labels/utils.js.
	 *
	 * @param object $order The resolved order.
	 *
	 * @return bool
	 */
	protected function hasPendingLabelShipment( object $order ): bool {
		$fulfillments = $order->fulfillments->data ?? $order->fulfillments ?? [];
		foreach ( $fulfillments as $fulfillment ) {
			if ( ! is_object( $fulfillment ) ) {
				continue;
			}
			$shipments = $fulfillment->shipments->data ?? $fulfillment->shipments ?? [];
			foreach ( $shipments as $shipment ) {
				if ( ! is_object( $shipment ) ) {
					continue;
				}
				if ( ! empty( $shipment->label_url ) ) {
					continue;
				}
				if ( ! in_array( $shipment->status ?? '', self::DONE_SHIPMENT_STATUSES, true ) ) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Status column. Collapses the modern DataView's per-shipment tags into
	 * one per-order status on the All tab.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return string
	 */
	public function column_status( $item ) {
		if ( $this->isPendingTab() ) {
			return '<sc-tag type="warning">' . esc_html__( 'Awaiting label', 'surecart' ) . '</sc-tag>';
		}

		$order = $this->resolveOrder( $item );
		if ( ! $order ) {
			return '-';
		}

		ob_start();

		if ( $this->hasPendingLabelShipment( $order ) ) {
			?>
			<div class="sc-status-badges">
				<sc-tag type="info"><?php echo esc_html__( 'Shipment created', 'surecart' ); ?></sc-tag>
				<sc-tag type="warning"><?php echo esc_html__( 'Awaiting label', 'surecart' ); ?></sc-tag>
			</div>
			<?php
			return ob_get_clean();
		}

		$fulfillment_tags = $this->getFulfillmentTags();
		$fulfillment      = $fulfillment_tags[ $order->fulfillment_status ?? '' ] ?? null;
		?>
		<div class="sc-status-badges">
			<?php if ( $fulfillment ) : ?>
				<sc-tag type="<?php echo esc_attr( $fulfillment['type'] ); ?>"><?php echo esc_html( $fulfillment['label'] ); ?></sc-tag>
			<?php endif; ?>
			<sc-tag type="default"><?php echo esc_html__( 'New shipment', 'surecart' ); ?></sc-tag>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Customer column. The Pending tab reads `to_contact` because the API
	 * won't expand `fulfillment.order.checkout` past 2 levels.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return string
	 */
	public function column_customer( $item ) {
		if ( $this->isPendingTab() ) {
			$contact = $item->to_contact ?? null;
			if ( is_object( $contact ) ) {
				$name = $contact->name ?? '';
				return esc_html( $name ? $name : ( $contact->email ?? '-' ) );
			}
			return '-';
		}

		$order = $this->resolveOrder( $item );
		if ( ! $order ) {
			return '-';
		}
		if ( ! is_object( $order->checkout ?? null ) ) {
			return '-';
		}

		$checkout = $order->checkout;
		$customer = $checkout->customer ?? null;
		if ( is_object( $customer ) ) {
			$name = $customer->name ?? '';
			if ( ! $name ) {
				$name = trim( ( $customer->first_name ?? '' ) . ' ' . ( $customer->last_name ?? '' ) );
			}
			return esc_html( $name ? $name : ( $customer->email ?? '-' ) );
		}

		$name = trim( ( $checkout->first_name ?? '' ) . ' ' . ( $checkout->last_name ?? '' ) );
		return esc_html( $name ? $name : ( $checkout->email ?? '-' ) );
	}

	/**
	 * Items column — a plain quantity count, not the modern view's
	 * "remaining quantity".
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return string
	 */
	public function column_items( $item ) {
		if ( $this->isPendingTab() ) {
			$fulfillment_items = [];
			if ( is_object( $item->fulfillment ?? null ) ) {
				$fulfillment_items = $item->fulfillment->fulfillment_items->data ?? $item->fulfillment->fulfillment_items ?? [];
			}

			$count = 0;
			foreach ( $fulfillment_items as $fulfillment_item ) {
				$count += (int) ( ( (object) $fulfillment_item )->quantity ?? 0 );
			}
			return esc_html( $count );
		}

		$order      = $this->resolveOrder( $item );
		$line_items = ( $order && is_object( $order->checkout ?? null ) ) ? ( $order->checkout->line_items->data ?? [] ) : [];

		$count = 0;
		foreach ( $line_items as $line_item ) {
			$count += (int) ( ( (object) $line_item )->quantity ?? 0 );
		}
		return esc_html( $count );
	}

	/**
	 * Ship-to column — `city, state · country`.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return string
	 */
	public function column_ship_to( $item ) {
		$address = $this->resolveAddress( $item );
		if ( ! is_object( $address ) ) {
			return '<sc-tag type="danger">' . esc_html__( 'Address invalid', 'surecart' ) . '</sc-tag>';
		}

		$city  = $address->city ?? '';
		$state = $address->state ?? '';

		// Mirror ship_to.js — line_1, city and country must all be present.
		$incomplete = empty( $address->line_1 ) ? true : ( empty( $city ) ? true : empty( $address->country ) );
		if ( $incomplete ) {
			return '<sc-tag type="danger">' . esc_html__( 'Address invalid', 'surecart' ) . '</sc-tag>';
		}

		$country    = $address->country ?? '';
		$city_state = implode( ', ', array_filter( [ $city, $state ] ) );
		$line       = implode( ' · ', array_filter( [ $city_state, $country ] ) );

		return esc_html( $line ? $line : '-' );
	}

	/**
	 * Resolve the row's shipping address — the checkout address on the All
	 * tab, `to_contact.address` on the Pending tab.
	 *
	 * @param \SureCart\Models\Order|\SureCart\Models\Shipment $item The row model.
	 *
	 * @return object|null
	 */
	private function resolveAddress( $item ): ?object {
		if ( $this->isPendingTab() ) {
			$contact = $item->to_contact ?? null;
			if ( is_object( $contact ) && is_object( $contact->address ?? null ) ) {
				return $contact->address;
			}
			return null;
		}

		$order = $this->resolveOrder( $item );
		if ( $order && is_object( $order->checkout ?? null ) && is_object( $order->checkout->shipping_address ?? null ) ) {
			return $order->checkout->shipping_address;
		}

		return null;
	}

	/**
	 * Tab-aware empty state.
	 *
	 * @return void
	 */
	public function no_items() {
		echo esc_html(
			$this->isPendingTab()
				? __( 'No pending labels.', 'surecart' )
				: __( 'No orders ready to ship.', 'surecart' )
		);
	}

	/**
	 * Display a search form. Adds the active `tab` the base form drops, and
	 * hides itself on the Pending tab — `/shipments` has no `query` param.
	 *
	 * @param string $text     The 'submit' button label.
	 * @param string $input_id ID attribute value for the search input field.
	 *
	 * @return void
	 */
	public function search_form( $text, $input_id ) {
		if ( $this->isPendingTab() ) {
			return;
		}
		?>
		<form id="posts-filter" method="get">
			<input type="hidden" name="page" value="sc-shipping-labels" />
			<input type="hidden" name="tab" value="<?php echo esc_attr( $this->getActiveTab() ); ?>" />
			<?php $this->search_box( $text, $input_id ); ?>
		</form>
		<?php
	}

	/**
	 * Extra table navigation — the island trigger button and the hidden
	 * page/tab inputs that keep the GET form on-tab. Deliberately does not
	 * call views(); the template renders the tabs. The button starts
	 * disabled and the island enables it once a row is checked.
	 *
	 * @param string $which Top or bottom placement.
	 *
	 * @return void
	 */
	protected function extra_tablenav( $which ) {
		if ( 'top' !== $which ) {
			return;
		}
		?>
		<input type="hidden" name="page" value="sc-shipping-labels" />
		<input type="hidden" name="tab" value="<?php echo esc_attr( $this->getActiveTab() ); ?>" />

		<div class="alignleft actions bulkactions">
			<button type="button" id="sc-create-shipping-labels" class="button action" disabled aria-disabled="true" title="<?php esc_attr_e( 'Select orders to create shipping labels.', 'surecart' ); ?>" aria-describedby="sc-create-shipping-labels-hint">
				<?php esc_html_e( 'Create shipping labels', 'surecart' ); ?>
			</button>
			<span id="sc-create-shipping-labels-hint" class="screen-reader-text"><?php esc_html_e( 'Select orders to create shipping labels.', 'surecart' ); ?></span>
		</div>
		<?php
	}
}
