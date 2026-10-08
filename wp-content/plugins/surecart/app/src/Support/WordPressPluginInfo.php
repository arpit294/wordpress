<?php

namespace SureCart\Support;

/**
 * Reads live plugin info (version, installs, rating) from wordpress.org.
 */
class WordPressPluginInfo {
	/**
	 * Get live plugin info (version, installs, rating) from wordpress.org.
	 *
	 * Cached for a day so we don't hit the .org API on every page load.
	 *
	 * @param string $slug Plugin slug.
	 * @return array
	 */
	public static function get( $slug ) {
		$transient_key = 'sc_plugin_info_' . $slug;
		$cached        = get_transient( $transient_key );
		if ( false !== $cached ) {
			return $cached;
		}

		if ( ! function_exists( 'plugins_api' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		}

		$info = plugins_api(
			'plugin_information',
			[
				'slug'   => $slug,
				'fields' => [
					'active_installs'   => true,
					'short_description' => false,
					'sections'          => false,
				],
			]
		);

		if ( is_wp_error( $info ) ) {
			return [];
		}

		$data = [
			'version'         => $info->version ?? '',
			'active_installs' => $info->active_installs ?? 0,
			'rating'          => $info->rating ?? 0, // 0-100 scale.
			'num_ratings'     => $info->num_ratings ?? 0,
		];

		set_transient( $transient_key, $data, DAY_IN_SECONDS );
		return $data;
	}
}
