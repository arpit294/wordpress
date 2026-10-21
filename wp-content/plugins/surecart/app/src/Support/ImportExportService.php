<?php

namespace SureCart\Support;

/**
 * Import/export destinations for the admin list views.
 *
 * Imports deep-link to app.surecart.com; exports open the in-plugin export screen.
 */
class ImportExportService {
	/**
	 * App resource slugs that support the import flow.
	 *
	 * @var string[]
	 */
	protected $import_resources = [
		'customers',
		'product_collections',
		'products',
		'purchases',
		'reviews',
		'subscriptions',
	];

	/**
	 * App resource slugs that support the export flow.
	 *
	 * @var string[]
	 */
	protected $export_resources = [
		'affiliations',
		'charges',
		'coupons',
		'customers',
		'line_items',
		'orders',
		'payouts',
		'prices',
		'promotions',
		'purchases',
		'referrals',
		'refunds',
		'reviews',
		'subscriptions',
		'variants',
	];

	/**
	 * Whether a resource supports the import flow.
	 *
	 * @param string $resource App resource slug (e.g. 'reviews').
	 * @return bool
	 */
	public function canImport( $resource ) {
		return in_array( $resource, $this->import_resources, true );
	}

	/**
	 * Import types whose capability differs from "publish_sc_{type}".
	 *
	 * Collections have no capability of their own; their admin page is gated by products.
	 *
	 * @var array<string, string>
	 */
	protected $import_capability_overrides = [
		'product_collections' => 'publish_sc_products',
	];

	/**
	 * WordPress capability required to import a resource type.
	 *
	 * @param string $resource App resource slug (e.g. 'reviews').
	 * @return string The capability, or empty string for unsupported resources.
	 */
	public function importCapability( $resource ) {
		if ( ! $this->canImport( $resource ) ) {
			return '';
		}

		return $this->import_capability_overrides[ $resource ] ?? 'publish_sc_' . $resource;
	}

	/**
	 * Export types whose capability differs from "publish_sc_{type}".
	 *
	 * Sub-resources are gated by their parent model's capability (e.g. variants
	 * by products, line items by orders, affiliate data by affiliates).
	 *
	 * @var array<string, string>
	 */
	protected $export_capability_overrides = [
		'payouts'      => 'publish_sc_affiliates',
		'affiliations' => 'publish_sc_affiliates',
		'referrals'    => 'publish_sc_affiliates',
		'variants'     => 'publish_sc_products',
		'line_items'   => 'publish_sc_orders',
	];

	/**
	 * Whether a resource supports the export flow.
	 *
	 * @param string $resource App resource slug (e.g. 'reviews').
	 * @return bool
	 */
	public function canExport( $resource ) {
		return in_array( $resource, $this->export_resources, true );
	}

	/**
	 * WordPress capability required to export a resource type.
	 *
	 * @param string $type Export resource type (e.g. 'affiliations', 'prices').
	 * @return string The capability, or empty string for unsupported types.
	 */
	public function exportCapability( $type ) {
		if ( ! $this->canExport( $type ) ) {
			return '';
		}

		return $this->export_capability_overrides[ $type ] ?? 'publish_sc_' . $type;
	}

	/**
	 * Import deep-links keyed by resource, for the React views (scData.import_export).
	 *
	 * @return array{import: array<string, string>}
	 */
	public function deepLinks() {
		$links = [];

		foreach ( $this->import_resources as $resource ) {
			$url = $this->importUrl( $resource );
			if ( $url ) {
				$links[ $resource ] = $url;
			}
		}

		return [ 'import' => $links ];
	}

	/**
	 * Import flow deep-link (app.surecart.com) for a resource.
	 *
	 * Unclaimed accounts are sent to the claim flow first, mirroring the export
	 * UI in the settings screen (ExportRow.js). Returned unescaped — callers
	 * escape at output.
	 *
	 * @param string $resource App resource slug (e.g. 'reviews').
	 * @return string Empty string when the resource has no import flow, the user
	 *                lacks its capability, or the app URL is missing.
	 */
	public function importUrl( $resource ) {
		if ( ! $this->canImport( $resource ) || ! current_user_can( $this->importCapability( $resource ) ) ) {
			return '';
		}

		// Unclaimed accounts cannot reach app resource pages — claim first.
		if ( ! \SureCart::account()->claimed ) {
			return \SureCart::routeUrl( 'account.claim' );
		}

		if ( ! defined( 'SURECART_APP_URL' ) ) {
			return '';
		}

		return add_query_arg(
			[ 'switch_account_id' => \SureCart::account()->id ?? '' ],
			SURECART_APP_URL . '/imports/' . $resource . '/new'
		);
	}

	/**
	 * Export flow link — the in-plugin export screen (action=export) on a list page.
	 *
	 * The screen renders on the resource's own admin page so the menu, title and
	 * chrome stay intact, and returns to it after export (see ExportController).
	 *
	 * @param string $type Export resource type (e.g. 'reviews', 'prices').
	 * @param string $page The admin page slug the export launches from (e.g. 'sc-orders').
	 * @return string Empty string when the type has no export flow.
	 */
	public function exportUrl( $type, $page ) {
		if ( ! $this->canExport( $type ) || empty( $page ) ) {
			return '';
		}

		return add_query_arg(
			[
				'page'   => $page,
				'action' => 'export',
				'type'   => $type,
			],
			admin_url( 'admin.php' )
		);
	}
}
