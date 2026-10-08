<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\StarterTemplatesController;
use SureCart\Rest\RestServiceInterface;

/**
 * Service provider for Starter Templates REST endpoints.
 *
 * The standalone Templates page's plugin/theme install action is not
 * registered here — it calls the generic `onboarding/install` endpoint
 * owned by {@see OnboardingRestServiceProvider}, since both flows share
 * the same "install and activate by slug" logic.
 */
class StarterTemplatesRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Rest controller.
	 *
	 * @var string
	 */
	protected $controller = StarterTemplatesController::class;

	/**
	 * The endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'starter_templates';

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function registerModelRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint,
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => $this->callback( $this->controller, 'index' ),
					'permission_callback' => [ $this, 'get_items_permission_check' ],
				],
				'schema' => [ $this, 'get_item_schema' ],
			]
		);

		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/favorites',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => $this->callback( $this->controller, 'toggleFavorite' ),
					'permission_callback' => [ $this, 'get_items_permission_check' ],
					'args'                => [
						'template_id' => [
							'type'     => 'integer',
							'required' => true,
						],
						'favorite'    => [
							'type'     => 'boolean',
							'required' => true,
						],
					],
				],
			]
		);
	}

	/**
	 * Get item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			return $this->schema;
		}

		$this->schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => $this->endpoint,
			'type'       => 'object',
			'properties' => [
				'id' => [
					'description' => esc_html__( 'Unique identifier for the template.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
			],
		];

		return $this->schema;
	}

	/**
	 * Check if user can read items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error
	 */
	public function get_items_permission_check( $request ) {
		return current_user_can( 'manage_options' );
	}
}
