<?php

namespace SureCart\WordPress\Admin\StarterTemplates;

use SureCart\Concerns\FindsPluginFile;

/**
 * Interop patches for the third-party Starter Templates (Astra Sites) plugin's
 * own `wp_ajax_astra-sites-*` handlers.
 *
 * These read $_POST directly and run outside the REST request lifecycle, so
 * they're kept separate from OnboardingController (a pure REST controller) and
 * are only ever invoked from StarterTemplatesAjaxBridgeServiceProvider.
 */
class StarterTemplatesAjaxInterop {
	use FindsPluginFile;

	/**
	 * Remap Starter Templates' required-plugin `init` paths to the plugin
	 * files actually installed, before its verify handler reads the payload.
	 *
	 * Template metadata assumes standard folder names (`surecart/surecart.php`);
	 * Starter Templates verifies by exact `init` path, so a plugin running from
	 * a renamed folder would never verify and the import could never start.
	 *
	 * Runs at priority 0 on `wp_ajax_astra-sites-verify-required-plugins` —
	 * nonce/capability enforcement stays with the Starter Templates handler.
	 *
	 * @return void
	 */
	public function remapVerifyRequiredPlugins() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing -- input normalization only; astra-sites verifies the nonce.
		$raw     = isset( $_POST['required_plugins'] ) ? sanitize_text_field( wp_unslash( $_POST['required_plugins'] ) ) : '';
		$plugins = json_decode( $raw, true );
		if ( empty( $plugins ) || ! is_array( $plugins ) ) {
			return;
		}

		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		foreach ( $plugins as &$plugin ) {
			// A non-array entry would fatal on offset access in PHP 8.
			if ( ! is_array( $plugin ) ) {
				continue;
			}
			$found = $this->findPluginFile( sanitize_key( $plugin['slug'] ?? '' ) );
			if ( $found ) {
				$plugin['init'] = $found;
			}
		}
		unset( $plugin );

		$_POST['required_plugins'] = wp_slash( wp_json_encode( $plugins ) );
	}

	/**
	 * Clear a stale Starter Templates WXR import lock before preparing the XML.
	 *
	 * The importer sets an `st_wxr_importer_progress` transient at import start
	 * (5 min TTL) and only cleans it up on a graceful finish. When an import
	 * dies mid-run, every retry inside the TTL is silently short-circuited —
	 * the SSE stream ends without a `complete` event ("connection failed"), or
	 * worse, a stale `completed` value makes the step succeed while importing
	 * nothing. Our onboarding is a single guided flow, so any lock present at
	 * prepare time is stale by definition.
	 *
	 * Runs at priority 0 on `wp_ajax_astra-sites-import_prepare_xml`.
	 *
	 * @return void
	 */
	public function clearStaleWxrImportLock() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		delete_transient( 'st_wxr_importer_progress' );
	}
}
