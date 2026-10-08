<?php

namespace SureCart\WordPress\Admin\StarterTemplates;

/**
 * Arms the third-party Starter Templates (Astra Sites) plugin's own upgrader
 * filters for a REST-triggered install.
 *
 * Those filters (`upgrader_pre_download`, `plugins_api`) read $_REQUEST
 * directly — an undocumented, private implementation detail of Astra Sites —
 * to decide whether to trust a non-.org download URL and to verify the
 * `astra-sites` nonce. Isolated here, behind a single named entry point,
 * instead of writing to the superglobal inline in a REST controller.
 */
class AstraSitesRequestContext {

	/**
	 * Oldest Astra Sites version this interop layer has been verified
	 * against. Bump when re-verifying against a newer release; installs
	 * older than this still get armed (fail open, since blocking a
	 * plugin-version guess would break more onboardings than it saves) but
	 * log a diagnostic instead of failing silently if the private contract
	 * has since changed.
	 *
	 * @var string
	 */
	const MIN_VERIFIED_VERSION = '4.4.0';

	/**
	 * Mark the current request as an Astra Sites request.
	 *
	 * Mirrors the params Starter Templates' own installer sends: its upgrader
	 * hooks verify the `astra-sites` nonce (else wp_die(-1)) and gate non-.org
	 * download URLs (e.g. Spectra) on `is_ast_request`.
	 *
	 * @return void
	 */
	public static function arm() {
		self::maybeLogVersionMismatch();

		$_REQUEST['is_ast_request']    = 'true';
		$_REQUEST['ajax_nonce']        = wp_create_nonce( 'astra-sites' );
		$_REQUEST['clear_destination'] = 'true';
	}

	/**
	 * Log a diagnostic when the installed Astra Sites version predates the
	 * one this private-contract interop was last verified against, or when
	 * an active install no longer exposes the ajax hook this interop keys
	 * off of, so a future silent break (renamed action/transient/param)
	 * points at a compatibility mismatch instead of an unexplained hang.
	 *
	 * Deliberately fails open either way — blocking the arm() call on a
	 * guess would break more onboardings than a real contract change would,
	 * and {@see OnboardingController::installPlugin()} already degrades a
	 * failed non-.org download to a "install manually" message.
	 *
	 * @return void
	 */
	protected static function maybeLogVersionMismatch() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		foreach ( get_plugins() as $file => $data ) {
			if ( 0 !== strpos( $file, 'astra-sites/' ) ) {
				continue;
			}

			$version = $data['Version'] ?? '';
			if ( $version && version_compare( $version, self::MIN_VERIFIED_VERSION, '<' ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
				error_log( sprintf( 'SureCart: Astra Sites %s is older than the %s baseline this onboarding interop was verified against; import may behave unexpectedly.', $version, self::MIN_VERIFIED_VERSION ) );
			} elseif ( is_plugin_active( $file ) && ! self::hasExpectedAjaxHook() ) {
				// Active and at/above the verified baseline, but the ajax
				// action this interop patches is gone — a strong signal
				// Astra Sites renamed its private contract.
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
				error_log( 'SureCart: Astra Sites is active but its expected wp_ajax_astra-sites-import_prepare_xml handler was not found; the onboarding Starter Templates interop may need updating.' );
			}

			return;
		}
	}

	/**
	 * Whether Astra Sites has registered the ajax action this interop layer
	 * relies on (`StarterTemplatesAjaxInterop::clearStaleWxrImportLock()`).
	 *
	 * Only meaningful once Astra Sites is active — during the bootstrap
	 * install request (which installs Astra Sites itself) it's expected to
	 * be false and isn't checked.
	 *
	 * @return bool
	 */
	protected static function hasExpectedAjaxHook() {
		global $wp_filter;

		$hook = $wp_filter['wp_ajax_astra-sites-import_prepare_xml'] ?? null;
		if ( ! $hook instanceof \WP_Hook ) {
			return false;
		}

		foreach ( $hook->callbacks as $callbacks ) {
			foreach ( $callbacks as $callback ) {
				$function = $callback['function'] ?? null;
				$instance = is_array( $function ) ? ( $function[0] ?? null ) : null;
				if ( ! $instance instanceof StarterTemplatesAjaxInterop ) {
					return true;
				}
			}
		}

		return false;
	}
}
