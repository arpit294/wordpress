<?php

namespace SureCart\Concerns;

/**
 * Resolves an installed plugin's main file from its slug.
 *
 * Plugin folders can't be trusted to match their slug — manual installs,
 * GitHub zips, and dev builds often run from renamed folders (e.g.
 * `surecart-stp-integration/surecart.php`), so a hardcoded
 * `{slug}/{slug}.php` check misreports install state and can trigger a
 * duplicate install over an already-loaded copy.
 */
trait FindsPluginFile {
	/**
	 * Find an installed plugin's main file by slug.
	 *
	 * @param string $slug Plugin slug (directory name).
	 * @return string Plugin file, or empty string if not found.
	 */
	protected function findPluginFile( $slug ) {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$matches = [];
		foreach ( array_keys( get_plugins() ) as $file ) {
			if ( strpos( $file, $slug . '/' ) === 0 ) {
				array_unshift( $matches, $file );
			} elseif ( basename( $file, '.php' ) === $slug ) {
				// Renamed folder, e.g. `surecart-stp-integration/surecart.php`.
				$matches[] = $file;
			}
		}

		// Prefer the active copy: a stale duplicate can shadow the running
		// plugin (e.g. leftover from a failed install), and activating it
		// double-loads the plugin and fatals.
		foreach ( $matches as $file ) {
			if ( is_plugin_active( $file ) ) {
				return $file;
			}
		}

		return $matches[0] ?? '';
	}
}
