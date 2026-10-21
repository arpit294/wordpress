<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\FindsPluginFile;
use SureCart\Concerns\GuardsPluginDownloads;
use SureCart\WordPress\Admin\StarterTemplates\AstraSitesRequestContext;

/**
 * Handles onboarding "Complete Site" server-side actions.
 *
 * Installs and activates the plugins/theme a Starter Template needs, then hands
 * the browser a fresh nonce so it can drive the (browser-only) Starter Templates
 * import AJAX sequence.
 */
class OnboardingController {
	use FindsPluginFile;
	use GuardsPluginDownloads;

	/**
	 * Install and activate the requirements for a template.
	 *
	 * @param \WP_REST_Request $request Rest request. Expects `requirements`:
	 *                                  an array of `{ slug, init, kind }`.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function install( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'install_plugins' ) || ! current_user_can( 'install_themes' ) || ! current_user_can( 'activate_plugins' ) || ! current_user_can( 'switch_themes' ) ) {
			return new \WP_Error(
				'surecart_forbidden',
				__( 'You do not have permission to install and activate plugins or themes.', 'surecart' ),
				[ 'status' => 403 ]
			);
		}

		// Respect sites that lock down file modifications.
		$file_mods_error = $this->assertFileModsAllowed();
		if ( $file_mods_error ) {
			return $file_mods_error;
		}

		$this->loadUpgraderDependencies();

		// Arm Starter Templates' own upgrader filters for this REST-triggered
		// install (see AstraSitesRequestContext).
		AstraSitesRequestContext::arm();

		$requirements = $request->get_param( 'requirements' );
		$requirements = is_array( $requirements ) ? $requirements : [];
		$results      = [];

		foreach ( $requirements as $requirement ) {
			$slug = sanitize_key( $requirement['slug'] ?? '' );
			if ( empty( $slug ) ) {
				continue;
			}

			$kind = ( 'theme' === ( $requirement['kind'] ?? 'plugin' ) ) ? 'theme' : 'plugin';

			$results[ $slug ] = 'theme' === $kind
				? $this->installTheme( $slug )
				: $this->installPlugin( $slug, sanitize_text_field( $requirement['init'] ?? '' ) );
		}

		return rest_ensure_response(
			[
				'results'     => $results,
				// Nonce for the browser-side Starter Templates AJAX steps.
				'astra_nonce' => wp_create_nonce( 'astra-sites' ),
			]
		);
	}

	/**
	 * Read the active state of a set of requirements (read-only).
	 *
	 * Lets the requirements UI show plugins/themes that are already active as
	 * done up front, instead of pretending to install them.
	 *
	 * @param \WP_REST_Request $request Rest request. Expects `requirements`:
	 *                                  an array of `{ slug, init, kind }`.
	 * @return \WP_REST_Response
	 */
	public function status( \WP_REST_Request $request ) {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$requirements = $request->get_param( 'requirements' );
		$requirements = is_array( $requirements ) ? $requirements : [];
		$statuses     = [];

		foreach ( $requirements as $requirement ) {
			$slug = sanitize_key( $requirement['slug'] ?? '' );
			if ( empty( $slug ) ) {
				continue;
			}

			if ( 'theme' === ( $requirement['kind'] ?? 'plugin' ) ) {
				$statuses[ $slug ] = ( get_stylesheet() === $slug );
				continue;
			}

			$init              = $this->findPluginFile( $slug ) ?: sanitize_text_field( $requirement['init'] ?? '' );
			$statuses[ $slug ] = $init ? is_plugin_active( $init ) : false;
		}

		return rest_ensure_response( [ 'statuses' => $statuses ] );
	}

	/**
	 * Install (if needed) and activate a wordpress.org plugin.
	 *
	 * Idempotent: safe to call for already-active plugins.
	 *
	 * @param string $slug Plugin slug.
	 * @param string $init Plugin main file, e.g. `surecart/surecart.php`.
	 * @return array `{ status, activated, message? }`.
	 */
	protected function installPlugin( $slug, $init ) {
		// The caller-supplied `init` must look like a plain `folder/file.php`
		// relative path — discard anything with traversal or absolute parts.
		if ( $init && 0 !== validate_file( $init ) ) {
			$init = '';
		}

		// Prefer what's actually installed — the template's `init` assumes a
		// standard folder name, and reinstalling over an already-loaded copy
		// fatals on activation (duplicate SureCart class/constants).
		$init = $this->findPluginFile( $slug ) ?: $init;

		if ( $init && is_plugin_active( $init ) ) {
			return [
				'status'    => 'active',
				'activated' => true,
			];
		}

		// Not installed yet — resolve a download URL and install.
		if ( ! $init || ! file_exists( WP_PLUGIN_DIR . '/' . $init ) ) {
			$download_url = $this->resolvePluginDownloadUrl( $slug );

			if ( empty( $download_url ) ) {
				// Not on wordpress.org and no bypass URL — a premium/third-party
				// plugin we can't install automatically.
				return [
					'status'  => 'manual',
					'message' => __( 'This is a premium plugin that can’t be installed automatically. Please install and activate it manually, then retry.', 'surecart' ),
				];
			}

			$upgrader = new \Plugin_Upgrader( new \WP_Ajax_Upgrader_Skin() );
			$result   = $this->installWithSafeDownload( $upgrader, $download_url );

			if ( is_wp_error( $result ) || ! $result ) {
				return $this->errorResult( $result, __( 'Installation failed.', 'surecart' ) );
			}

			// The caller-supplied init may be wrong; trust what was actually installed.
			$init = $this->findPluginFile( $slug ) ?: $init;
		}

		// Only activate a file WordPress itself lists as an installed plugin.
		if ( ! $init || ! array_key_exists( $init, get_plugins() ) ) {
			return $this->errorResult( null, __( 'The plugin could not be located after installation. Please install and activate it manually, then retry.', 'surecart' ) );
		}

		$activated = activate_plugin( $init );
		if ( is_wp_error( $activated ) ) {
			return $this->errorResult( $activated, '' );
		}

		return [
			'status'    => 'active',
			'activated' => true,
		];
	}

	/**
	 * Install (if needed) and activate a wordpress.org theme.
	 *
	 * @param string $slug Theme slug (stylesheet).
	 * @return array `{ status, message? }`.
	 */
	protected function installTheme( $slug ) {
		$theme = wp_get_theme( $slug );

		if ( ! $theme->exists() ) {
			$api = themes_api(
				'theme_information',
				[
					'slug'   => $slug,
					'fields' => [ 'sections' => false ],
				]
			);

			if ( is_wp_error( $api ) || empty( $api->download_link ) ) {
				return $this->errorResult( $api, __( 'Theme not found.', 'surecart' ) );
			}

			$upgrader = new \Theme_Upgrader( new \WP_Ajax_Upgrader_Skin() );
			$result   = $this->installWithSafeDownload( $upgrader, $api->download_link );

			if ( is_wp_error( $result ) || ! $result ) {
				return $this->errorResult( $result, __( 'Theme installation failed.', 'surecart' ) );
			}
		}

		// Activate only if it isn't already the active theme.
		if ( get_stylesheet() !== $slug ) {
			switch_theme( $slug );
		}

		return [ 'status' => 'active' ];
	}

	/**
	 * Resolve a plugin's download URL via `plugins_api()`.
	 *
	 * wordpress.org plugins resolve directly; non-.org builds (e.g. the v3
	 * `spectra-blocks`) are resolved by Starter Templates' own `plugins_api`
	 * filter, which we arm by setting `is_ast_request` in {@see install()} and
	 * by installing only after the import-started flag is set.
	 *
	 * @param string $slug Plugin slug.
	 * @return string Download URL, or empty string if none can be resolved.
	 */
	protected function resolvePluginDownloadUrl( $slug ) {
		$api = plugins_api(
			'plugin_information',
			[
				'slug'   => $slug,
				'fields' => [ 'sections' => false ],
			]
		);

		if ( ! is_wp_error( $api ) && ! empty( $api->download_link ) ) {
			return $api->download_link;
		}

		return '';
	}

	/**
	 * Build an error result, preferring a WP_Error's own message.
	 *
	 * @param \WP_Error|mixed $error    Result to inspect for a message.
	 * @param string          $fallback Message used when $error isn't a WP_Error.
	 * @return array `{ status: 'error', message }`.
	 */
	protected function errorResult( $error, $fallback ) {
		return [
			'status'  => 'error',
			'message' => is_wp_error( $error ) ? $error->get_error_message() : $fallback,
		];
	}

	/**
	 * Load the WordPress upgrader/plugin/theme APIs on demand.
	 *
	 * @return void
	 */
	protected function loadUpgraderDependencies() {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/misc.php';
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		require_once ABSPATH . 'wp-admin/includes/theme.php';
		require_once ABSPATH . 'wp-admin/includes/theme-install.php';
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
	}
}
