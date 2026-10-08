<?php

namespace SureCart\Support;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Registers the import/export service.
 */
class ImportExportServiceProvider implements ServiceProviderInterface {
	/**
	 * Register the service in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.import_export'] = function () {
			return new ImportExportService();
		};

		$app = $container[ SURECART_APPLICATION_KEY ];

		$app->alias( 'importExport', 'surecart.import_export' );
	}

	/**
	 * Bootstrap the service.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		add_action( 'admin_notices', [ $this, 'renderExportCreatedNotice' ] );
	}

	/**
	 * Show a success notice after an export is created (export_created=1 redirect).
	 *
	 * Only on our pages — the export flow always returns to a SureCart list page.
	 *
	 * @return void
	 */
	public function renderExportCreatedNotice() {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( empty( $_GET['export_created'] ) || 0 !== strpos( $page, 'sc-' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}
		?>
		<div class="notice notice-success is-dismissible">
			<p><?php esc_html_e( 'Your export is being prepared. We’ll email you a link when it’s ready.', 'surecart' ); ?></p>
		</div>
		<?php
	}
}
