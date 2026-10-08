<?php

namespace SureCart\Controllers\Rest;

use SureCart\Concerns\FindsPluginFile;
use SureCart\Models\StarterTemplate;
use SureCart\Support\WordPressPluginInfo;

/**
 * Handle starter templates requests through the REST API.
 */
class StarterTemplatesController {
	use FindsPluginFile;

	/**
	 * User meta key holding the favorited template ids (per-user).
	 *
	 * @var string
	 */
	const FAVORITES_META = 'surecart_starter_template_favorites';

	/**
	 * Get all starter templates.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function index( \WP_REST_Request $request ) {
		$raw_data = StarterTemplate::fetchAll();

		if ( is_wp_error( $raw_data ) ) {
			return $raw_data;
		}

		$templates = array_values( $raw_data );

		// Get plugin status for CTA button.
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		// Resolve the real install location — the folder may be renamed.
		$plugin_file   = $this->findPluginFile( 'astra-sites' );
		$plugin_status = [
			'is_installed' => (bool) $plugin_file,
			'is_active'    => $plugin_file && is_plugin_active( $plugin_file ),
		];

		return rest_ensure_response(
			[
				'templates'     => $templates,
				'plugin_status' => $plugin_status,
				'plugin_info'   => WordPressPluginInfo::get( 'astra-sites' ),
				'favorites'     => $this->getFavorites(),
			]
		);
	}

	/**
	 * Add or remove a template from the favorites list.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 * @return \WP_REST_Response
	 */
	public function toggleFavorite( \WP_REST_Request $request ) {
		$template_id = (int) $request->get_param( 'template_id' );
		$favorite    = (bool) $request->get_param( 'favorite' );
		$favorites   = $this->getFavorites();

		if ( $favorite ) {
			$favorites[] = $template_id;
			$favorites   = array_values( array_unique( $favorites ) );
		} else {
			$favorites = array_values( array_diff( $favorites, [ $template_id ] ) );
		}

		update_user_meta( get_current_user_id(), self::FAVORITES_META, $favorites );

		return rest_ensure_response( [ 'favorites' => $favorites ] );
	}

	/**
	 * Get the current user's favorited template ids.
	 *
	 * @return int[]
	 */
	protected function getFavorites() {
		$favorites = get_user_meta( get_current_user_id(), self::FAVORITES_META, true );
		return is_array( $favorites ) ? array_map( 'intval', $favorites ) : [];
	}
}
