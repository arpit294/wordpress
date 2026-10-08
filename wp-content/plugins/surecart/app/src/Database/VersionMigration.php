<?php

namespace SureCart\Database;

/**
 * A migration that will run each time the version of the plugin changes.
 */
abstract class VersionMigration {
	/**
	 * The key for the migration.
	 *
	 * @var string
	 */
	protected $migration_key = 'surecart_migration_version';

	/**
	 * Set from run() when a post update fails; complete() then defers marking
	 * so the next admin_init retries.
	 *
	 * @var bool
	 */
	protected $failed = false;

	/**
	 * Failed runs allowed before giving up — otherwise a permanently failing
	 * save would retry on every admin_init forever.
	 *
	 * @var int
	 */
	const MAX_FAILED_ATTEMPTS = 5;

	/**
	 * Run on init.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'admin_init', [ $this, 'maybeRun' ] );
	}

	/**
	 * Get the current version of the plugin.
	 *
	 * @return string
	 */
	public function currentVersion() {
		return \SureCart::plugin()->version();
	}

	/**
	 * Maybe let's run the migration.
	 *
	 * @return void
	 */
	public function maybeRun() {
		if ( ! $this->shouldMigrate() ) {
			return;
		}

		// run the migration.
		$this->run();

		// update the migration complete on admin_init complete, after all migrations have run.
		add_action( 'admin_init', [ $this, 'complete' ], 999999 );
	}

	/**
	 * Should we run this migration?
	 *
	 * @return boolean
	 */
	public function shouldMigrate(): bool {
		// check if we already have done this migration.
		return version_compare( $this->currentVersion(), $this->getLastMigrationVersion(), '!=' );
	}

	/**
	 * Run the migration
	 *
	 * @return void
	 */
	protected function run() {
	}

	/**
	 * Save migrated post content without kses mangling it.
	 *
	 * Migrations re-save content that already passed a privileged save plus
	 * plugin-generated block markup, so kses must not run — admin_init also
	 * fires on logged-out admin-ajax requests, where kses would strip <style>
	 * and <script> tags. wp_update_post() also expects slashed data, so we
	 * slash to keep backslashes (e.g. CSS "\f101", block attribute JSON) intact.
	 *
	 * Callers must only pass content derived from what is already stored plus
	 * plugin-generated markup — never fresh user, customer, or webhook input,
	 * which would inherit the kses bypass.
	 *
	 * @param int    $post_id The post to update.
	 * @param string $content The migrated post content.
	 * @return int|\WP_Error The post ID on success, WP_Error on failure.
	 */
	protected function updatePostContent( int $post_id, string $content ) {
		// remember the actual prior state — kses_init() on restore would recompute
		// from capability and undo a kses another plugin forced on.
		$had_kses = false !== has_filter( 'content_save_pre', 'wp_filter_post_kses' );

		// disables kses process-wide, so scope it per save (don't hoist around
		// callers' loops) — the toggle is cheap, the narrow window is the point.
		kses_remove_filters();

		try {
			$result = wp_update_post(
				wp_slash(
					array(
						'ID'           => $post_id,
						'post_content' => $content,
					)
				),
				true
			);
		} finally {
			// a throwing save_post hook must not leave kses disabled for the rest of the request.
			if ( $had_kses ) {
				kses_init_filters();
			}
		}

		return $result;
	}

	/**
	 * Store the current plugin version when complete.
	 *
	 * A failed run defers completion so the next admin_init retries; after
	 * MAX_FAILED_ATTEMPTS we mark complete anyway and stop. The counter resets
	 * on completion, so the next version bump gets a fresh retry budget.
	 *
	 * @return void
	 */
	public function complete() {
		$attempts_key = $this->migration_key . '_failed_attempts';

		if ( $this->failed ) {
			$attempts = (int) get_option( $attempts_key, 0 ) + 1;

			if ( $attempts < self::MAX_FAILED_ATTEMPTS ) {
				update_option( $attempts_key, $attempts, false );
				return;
			}

			error_log( 'SureCart: ' . $this->migration_key . ' migration gave up after ' . $attempts . ' failed attempts — some content may still be on the old markup.' );
		}

		delete_option( $attempts_key );
		update_option( $this->migration_key, $this->currentVersion(), false ); // don't autoload since we are only doing this on the admin.
	}

	/**
	 * Get the last version there was a migration.
	 *
	 * @return string
	 */
	public function getLastMigrationVersion() {
		return get_option( $this->migration_key, '0.0.0' );
	}
}
