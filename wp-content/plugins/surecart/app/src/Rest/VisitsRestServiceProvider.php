<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\VisitsController;

/**
 * Public endpoint that relays affiliate clicks to the SureCart API.
 * Generically named on purpose — ad-blocker lists match keywords like "click" in URLs.
 */
class VisitsRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'visits';

	/**
	 * Methods allowed for the model.
	 *
	 * This is empty because it's a public endpoint that only allows POST requests.
	 *
	 * @var array
	 */
	protected $methods = [];

	/**
	 * Bootstrap routes and the tracking script that posts to them.
	 *
	 * @param \Pimple\Container $container Service Container.
	 *
	 * @return void
	 */
	public function bootstrap( $container ) {
		parent::bootstrap( $container );
		add_action( 'init', [ $this, 'registerScript' ] );
	}

	/**
	 * Register the bundled affiliate tracking script.
	 *
	 * @return void
	 */
	public function registerScript() {
		if ( wp_script_is( 'surecart-affiliate-tracking', 'registered' ) ) {
			return;
		}

		wp_register_script(
			'surecart-affiliate-tracking',
			plugins_url( 'dist/scripts/visits.js', SURECART_PLUGIN_FILE ),
			[],
			\SureCart::plugin()->version(),
			[
				'strategy' => 'defer',
			]
		);

		wp_add_inline_script(
			'surecart-affiliate-tracking',
			'window.SureCartAffiliatesConfig = ' . wp_json_encode(
				[
					'endpoint' => esc_url_raw( rest_url( "$this->name/v$this->version/$this->endpoint" ) ),
				]
			) . ';',
			'before'
		);
	}

	/**
	 * Register REST Routes
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			"$this->endpoint",
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => $this->callback( VisitsController::class, 'create' ),
					'permission_callback' => '__return_true',
					'args'                => [
						'affiliation_code' => [
							'description' => esc_html__( 'The affiliation code.', 'surecart' ),
							'type'        => 'string',
							'required'    => true,
						],
						'url'              => [
							'description' => esc_html__( 'The URL the visit happened on.', 'surecart' ),
							'type'        => 'string',
							'format'      => 'uri',
							'required'    => true,
						],
						'referrer'         => [
							'description' => esc_html__( 'The page referrer.', 'surecart' ),
							'type'        => 'string',
						],
					],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Get our schema for a visit.
	 *
	 * @return array The schema for a visit.
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			// Since WordPress 5.3, the schema can be cached in the $schema property.
			return $this->schema;
		}

		$this->schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => $this->endpoint,
			'type'       => 'object',
			'properties' => [
				'id' => [
					'description' => esc_html__( 'Unique identifier for the object.', 'surecart' ),
					'type'        => 'string',
					'readonly'    => true,
				],
			],
		];

		return $this->schema;
	}
}
