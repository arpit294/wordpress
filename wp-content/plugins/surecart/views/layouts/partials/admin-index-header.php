<?php
// let's make sure this page is not cached.
header( 'Cache-Control: no-cache, no-store, must-revalidate' );
header( 'Pragma: no-cache' );
header( 'Expires: 0' );
?>

<?php \SureCart::render( 'components/admin/flash-messages' ); ?>

<h1 class="wp-heading-inline"><?php echo wp_kses_post( $title ?? '' ); ?></h1>

<?php if ( isset( $new_link ) ) : ?>
	<a href="<?php echo esc_url( $new_link ); ?>" class="page-title-action" data-test-id="add-new-button">
		<?php esc_html_e( 'Add New', 'surecart' ); ?>
	</a>
<?php endif; ?>

<?php if ( isset( $after_title ) ) : ?>
	<?php
	// Custom "Add" control (e.g. a dropdown) — rendered in the Add slot, before
	// the import/export actions, to match WordPress' title-action ordering.
	$allowed                   = wp_kses_allowed_html( 'post' );
	$allowed['button']['slot'] = true;
	echo wp_kses( $after_title, $allowed );
	?>
<?php endif; ?>

<?php
$sc_import_url = ! empty( $import_resource ) ? \SureCart::importExport()->importUrl( $import_resource ) : '';

// The export screen renders on the current list page (action=export).
$sc_export_page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

// Unify single/multi export into one list of { label, url }, keeping only supported types.
$sc_export_items = [];
if ( ! empty( $export_resources ) && is_array( $export_resources ) ) {
	foreach ( $export_resources as $sc_export_option ) {
		$sc_option_url = \SureCart::importExport()->exportUrl( $sc_export_option['resource'] ?? '', $sc_export_page );
		if ( $sc_option_url ) {
			$sc_export_items[] = [
				'label' => $sc_export_option['label'] ?? '',
				'url'   => $sc_option_url,
			];
		}
	}
} elseif ( ! empty( $export_resource ) ) {
	$sc_single_export_url = \SureCart::importExport()->exportUrl( $export_resource, $sc_export_page );
	if ( $sc_single_export_url ) {
		$sc_export_items[] = [
			'label' => __( 'Export', 'surecart' ),
			'url'   => $sc_single_export_url,
		];
	}
}

// Group the menu (section labels + divider) only when there are multiple
// export types to organise; a lone Import/Export pair reads fine flat.
$sc_grouped = count( $sc_export_items ) > 1;
?>
<?php if ( $sc_import_url || ! empty( $sc_export_items ) ) : ?>
	<sc-dropdown placement="bottom-end" class="sc-import-export-menu" style="margin-left: 4px; vertical-align: middle;">
		<sc-button type="text" slot="trigger" data-test-id="import-export-menu">
			<sc-icon name="more-horizontal"></sc-icon>
		</sc-button>
		<sc-menu>
			<?php if ( $sc_import_url ) : ?>
				<?php if ( $sc_grouped ) : ?>
					<sc-menu-label><?php esc_html_e( 'Import', 'surecart' ); ?></sc-menu-label>
				<?php endif; ?>
				<sc-menu-item class="sc-import-export-menu__import" data-test-id="import-button">
					<sc-icon slot="prefix" name="external-link" style="opacity: 0.5;"></sc-icon>
					<?php esc_html_e( 'Import', 'surecart' ); ?>
				</sc-menu-item>
			<?php endif; ?>

			<?php if ( $sc_grouped && $sc_import_url && ! empty( $sc_export_items ) ) : ?>
				<sc-menu-divider></sc-menu-divider>
			<?php endif; ?>

			<?php if ( ! empty( $sc_export_items ) ) : ?>
				<?php if ( $sc_grouped ) : ?>
					<sc-menu-label><?php esc_html_e( 'Export', 'surecart' ); ?></sc-menu-label>
				<?php endif; ?>
				<?php foreach ( $sc_export_items as $sc_export_item ) : ?>
					<sc-menu-item href="<?php echo esc_url( $sc_export_item['url'] ); ?>" data-test-id="export-button">
						<sc-icon slot="prefix" name="download" style="opacity: 0.5;"></sc-icon>
						<?php echo esc_html( $sc_export_item['label'] ); ?>
					</sc-menu-item>
				<?php endforeach; ?>
			<?php endif; ?>
		</sc-menu>
	</sc-dropdown>

	<?php if ( $sc_import_url ) : ?>
		<sc-dialog label="<?php esc_attr_e( 'Import to SureCart', 'surecart' ); ?>" class="sc-import-export-dialog">
			<div style="margin-bottom: 1.5em;">
				<?php esc_html_e( 'Imports run in your SureCart dashboard. We’ll open the importer in a new tab where you can upload your file and match up the columns.', 'surecart' ); ?>
			</div>
			<div style="display: flex; gap: 8px;">
				<sc-button type="primary" class="sc-import-export-dialog__continue" href="<?php echo esc_url( $sc_import_url ); ?>" target="_blank" rel="noopener noreferrer" data-test-id="import-confirm">
					<?php esc_html_e( 'Continue to SureCart', 'surecart' ); ?>
					<sc-icon slot="suffix" name="external-link"></sc-icon>
				</sc-button>
				<sc-button type="text" class="sc-import-export-dialog__cancel">
					<?php esc_html_e( 'Cancel', 'surecart' ); ?>
				</sc-button>
			</div>
		</sc-dialog>

		<script>
			( function () {
				var menu = document.querySelector( '.sc-import-export-menu' );
				var dialog = document.querySelector( '.sc-import-export-dialog' );
				if ( ! menu || ! dialog ) {
					return;
				}

				// Re-parent to <body> so the dialog overlay isn't trapped inside a
				// sticky/positioned header stacking context as React portal.
				document.body.appendChild( dialog );
				var open = menu.querySelector( '.sc-import-export-menu__import' );
				var close = function () {
					dialog.removeAttribute( 'open' );
				};
				if ( open ) {
					open.addEventListener( 'click', function () {
						dialog.setAttribute( 'open', '' );
					} );
				}
				dialog.querySelectorAll(
					'.sc-import-export-dialog__cancel, .sc-import-export-dialog__continue'
				).forEach( function ( el ) {
					el.addEventListener( 'click', close );
				} );

				// Overlay / Escape / close-button all fire scRequestClose.
				dialog.addEventListener( 'scRequestClose', close );
			}() );
		</script>
	<?php endif; ?>
<?php endif; ?>

<hr class="wp-header-end" />
