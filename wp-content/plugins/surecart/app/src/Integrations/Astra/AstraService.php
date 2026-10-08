<?php

namespace SureCart\Integrations\Astra;

/**
 * Compatibility with Astra's Design Library (gutenberg-templates),
 * bundled by Astra Sites, Spectra and Ultimate Addons for Gutenberg.
 */
class AstraService {
	/**
	 * Bootstrap the Astra integration.
	 *
	 * @return void
	 */
	public function bootstrap(): void {
		add_filter( 'ast_block_templates_disable_editor_button', [ $this, 'disableDesignLibraryOnSureCartPages' ] );
	}

	/**
	 * Keep the Design Library off our admin pages. Several of them fire
	 * `enqueue_block_editor_assets`, and its bundle injects a global Tailwind
	 * reset (`* { margin: 0 }`) that strips spacing from our web components.
	 *
	 * @param bool $disable Whether the Design Library editor button is disabled.
	 * @return bool
	 */
	public function disableDesignLibraryOnSureCartPages( $disable ) {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return $disable || 0 === strpos( $page, 'sc-' );
	}
}
