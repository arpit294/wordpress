<?php

namespace SureCart\WordPress\Cache;

use SureCart\Database\VersionMigration;

/**
 * Regenerates SG Optimizer's File Caching config once per SiteGroundCacheService::CONFIG_VERSION bump.
 *
 * SG Optimizer bakes `sgo_bypass_cookies` into a static config file
 * (`wp-content/sgo-config.php`) the first time File Caching is enabled, so
 * exclusion changes need a one-time regeneration to take effect on sites
 * where that file already existed before this integration shipped.
 */
class SiteGroundConfigMigrationService extends VersionMigration {
	/**
	 * The key for the migration.
	 *
	 * @var string
	 */
	protected $migration_key = 'surecart_siteground_config_version';

	/**
	 * The version to migrate to — bumped in SiteGroundCacheService whenever
	 * the bypass-cookie logic changes.
	 *
	 * @return string
	 */
	public function currentVersion() {
		return SiteGroundCacheService::CONFIG_VERSION;
	}

	/**
	 * Regenerate SG Optimizer's File Caching config file.
	 *
	 * Uses the same $siteground_optimizer_loader global the plugin's own
	 * public sg_cachepress_purge_cache() helper relies on — there is no
	 * dedicated procedural function for a config refresh.
	 *
	 * @return void
	 */
	protected function run() {
		// File_Cacher::create_config() doesn't check this itself, so without this
		// guard a refresh would create an unused sgo-config.php on every SG
		// Optimizer site — not just ones with File Caching turned on. Matches
		// Options::is_enabled()'s own check without depending on that internal class.
		if ( 1 !== (int) get_option( 'siteground_optimizer_file_caching' ) ) {
			return;
		}

		global $siteground_optimizer_loader;

		if ( isset( $siteground_optimizer_loader->file_cacher ) && method_exists( $siteground_optimizer_loader->file_cacher, 'refresh_config' ) ) {
			$siteground_optimizer_loader->file_cacher->refresh_config();
		}
	}
}
