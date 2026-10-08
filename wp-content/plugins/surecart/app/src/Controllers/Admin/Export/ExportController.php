<?php

namespace SureCart\Controllers\Admin\Export;

use SureCart\Controllers\Admin\AdminController;

/**
 * Renders the shared in-plugin export screen for any resource type.
 */
class ExportController extends AdminController {

	/**
	 * Export screen.
	 *
	 * @param \SureCartCore\Http\Request $request Request object.
	 *
	 * @return string
	 */
	public function index( $request ) {
		$type = sanitize_key( (string) $request->query( 'type' ) );

		// Only allow resource types the app supports exporting.
		if ( ! \SureCart::importExport()->canExport( $type ) ) {
			wp_die( esc_html__( 'Invalid export type.', 'surecart' ) );
		}

		// The page-level route middleware only gates on that page's own
		// capability (e.g. `edit_sc_orders`); `type` is a caller-controlled
		// param that can name a different resource, so check its capability too.
		if ( ! current_user_can( \SureCart::importExport()->exportCapability( $type ) ) ) {
			wp_die( esc_html__( 'You do not have permission to export this resource.', 'surecart' ), '', [ 'response' => 403 ] );
		}

		// Return to the page the export was launched from (validated same-site).
		$return_url = wp_validate_redirect(
			wp_get_referer(),
			admin_url( 'admin.php?page=sc-dashboard' )
		);

		$context = [
			'type'       => $type,
			'title'      => sprintf(
				/* translators: %s: resource name, e.g. "Reviews". */
				__( 'Export %s', 'surecart' ),
				ucwords( str_replace( [ '_', '-' ], ' ', $type ) )
			),
			'return_url' => $return_url,
		];

		// Pass the export context to the shared bundle via scData.export.
		add_filter(
			'surecart/scripts/admin/export/data',
			function ( $data ) use ( $context ) {
				$data['export'] = $context;
				return $data;
			}
		);

		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( ExportScriptsController::class, 'enqueue' ) );

		$this->preloadPaths( [ '/wp/v2/users/me?context=edit' ] );

		return '<div id="app"></div>';
	}
}
