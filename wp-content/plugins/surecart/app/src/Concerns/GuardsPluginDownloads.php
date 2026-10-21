<?php

namespace SureCart\Concerns;

/**
 * Shared safety checks for controllers that install plugins/themes via
 * `Plugin_Upgrader`/`Theme_Upgrader`.
 *
 * Used by both PluginInstallerController (GitHub-sourced integrations) and
 * OnboardingController (wordpress.org/Starter-Templates-sourced installs) so
 * the DISALLOW_FILE_MODS guard and download-safety filter can't drift between
 * the two install paths.
 */
trait GuardsPluginDownloads {
	/**
	 * Refuse to install when the site has locked down file modifications.
	 *
	 * @return \WP_Error|null A WP_Error when installs are disallowed, null otherwise.
	 */
	protected function assertFileModsAllowed() {
		if ( defined( 'DISALLOW_FILE_MODS' ) && DISALLOW_FILE_MODS ) {
			return new \WP_Error(
				'sc_file_mods_disabled',
				__( 'Plugin installation is disabled on this site (DISALLOW_FILE_MODS).', 'surecart' ),
				[ 'status' => 403 ]
			);
		}

		return null;
	}

	/**
	 * Force WP HTTP to reject internal/loopback URLs for the plugin download.
	 *
	 * Closes the SSRF vector where a redirect points at a private or loopback
	 * address. Only touches the streamed download chain ($args['filename'] is set
	 * by download_url() and preserved across redirect hops); any other request
	 * fired during the install window is left as-is.
	 *
	 * @param array $args The http request args.
	 *
	 * @return array
	 */
	public function rejectUnsafeDownloadUrls( $args ) {
		if ( ! empty( $args['filename'] ) ) {
			$args['reject_unsafe_urls'] = true;
		}
		return $args;
	}

	/**
	 * Run an upgrader install with the download-safety filter scoped to the call.
	 *
	 * @param \Plugin_Upgrader|\Theme_Upgrader $upgrader Upgrader instance.
	 * @param string                           $url      Download URL to install.
	 *
	 * @return bool|\WP_Error
	 */
	protected function installWithSafeDownload( $upgrader, $url ) {
		add_filter( 'http_request_args', [ $this, 'rejectUnsafeDownloadUrls' ], 10, 1 );
		try {
			return $upgrader->install( $url );
		} finally {
			remove_filter( 'http_request_args', [ $this, 'rejectUnsafeDownloadUrls' ], 10 );
		}
	}
}
