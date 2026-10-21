<?php

namespace SureCart\WordPress\Cache;

use SureCart\Database\VersionMigration;

/**
 * Regenerates WP Rocket's config file once per WpRocketCacheService::CONFIG_VERSION bump.
 *
 * WP Rocket bakes its reject URIs into a static config file, so exclusion
 * changes need a one-time regeneration to take effect without requiring a
 * manual WP Rocket settings save.
 */
class WpRocketConfigMigrationService extends VersionMigration {
	/**
	 * The key for the migration.
	 *
	 * @var string
	 */
	protected $migration_key = 'surecart_wp_rocket_config_version';

	/**
	 * The version to migrate to — bumped in WpRocketCacheService whenever
	 * the reject-URI/JS-exclusion logic changes.
	 *
	 * @return string
	 */
	public function currentVersion() {
		return WpRocketCacheService::CONFIG_VERSION;
	}

	/**
	 * Regenerate WP Rocket's config file.
	 *
	 * @return void
	 */
	protected function run() {
		if ( function_exists( 'rocket_generate_config_file' ) ) {
			rocket_generate_config_file();
		}
	}
}
