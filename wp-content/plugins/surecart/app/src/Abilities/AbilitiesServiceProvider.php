<?php

namespace SureCart\Abilities;

use SureCart\Models\ApiToken;
use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Service provider for WordPress 6.9+ Abilities API integration.
 */
class AbilitiesServiceProvider implements ServiceProviderInterface {

	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.abilities.registrar'] = function () {
			return new AbilityRegistrar();
		};
	}

	/**
	 * Bootstrap the service.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		// Graceful degradation: do nothing if WP < 6.9 or Abilities API not available.
		if ( ! function_exists( 'wp_register_ability_category' ) ) {
			return;
		}

		// Make ability run endpoints friendly to clients that can't send bracket-style query params.
		add_filter( 'rest_request_before_callbacks', array( $this, 'normalizeRunInput' ), 10, 3 );

		// Don't register abilities if the store is not connected.
		if ( empty( ApiToken::get() ) ) {
			return;
		}

		// Don't register abilities if they are globally disabled.
		if ( ! get_option( 'surecart_mcp_abilities_enabled', true ) ) {
			return;
		}

		$registrar = $container['surecart.abilities.registrar'];

		// Pass toggle settings to the registrar so it can filter abilities.
		$registrar->set_settings(
			array(
				'edit_enabled'   => (bool) get_option( 'surecart_mcp_edit_abilities_enabled', true ),
				'delete_enabled' => (bool) get_option( 'surecart_mcp_delete_abilities_enabled', true ),
			)
		);

		add_action( 'wp_abilities_api_categories_init', array( $registrar, 'register_category' ) );
		add_action( 'wp_abilities_api_init', array( $registrar, 'register_abilities' ) );
	}

	/**
	 * Normalize the `input` param on SureCart ability run GET/DELETE requests.
	 *
	 * Read-only abilities must be called via GET and destructive idempotent
	 * ones via DELETE — core reads input for both from the query string.
	 * Some AI clients (e.g. ChatGPT Actions) cannot reliably serialize
	 * object query parameters in the bracket style PHP expects
	 * (input[key]=value). This accepts `input` as a JSON-encoded string
	 * too, and defaults a missing `input` to an empty object so abilities
	 * without parameters can be called without placeholder values. Runs
	 * before callback validation, so the decoded value is what the
	 * ability's own input schema validates against.
	 *
	 * @param \WP_REST_Response|\WP_Error|null $response Result to send to the client.
	 * @param array                            $handler  Route handler used for the request.
	 * @param \WP_REST_Request                 $request  Request used to generate the response.
	 * @return \WP_REST_Response|\WP_Error|null Unchanged response.
	 */
	public function normalizeRunInput( $response, $handler, $request ) {
		if ( ! in_array( $request->get_method(), array( 'GET', 'DELETE' ), true ) || ! preg_match( '#^/wp-abilities/v\d+/abilities/surecart/.+/run$#', $request->get_route() ) ) {
			return $response;
		}

		// Core reads GET/DELETE ability input from the query string, so normalize the query params directly.
		$query_params = $request->get_query_params();
		$input        = $query_params['input'] ?? null;

		// Accept a JSON-encoded object as an alternative to bracket-style params.
		if ( is_string( $input ) ) {
			$decoded = json_decode( $input, true );
			if ( is_array( $decoded ) ) {
				$query_params['input'] = $decoded;
			}
		}

		// The run endpoint rejects a missing input; default it so no-arg abilities just work.
		if ( ! isset( $query_params['input'] ) ) {
			$query_params['input'] = array();
		}

		$request->set_query_params( $query_params );

		return $response;
	}
}
