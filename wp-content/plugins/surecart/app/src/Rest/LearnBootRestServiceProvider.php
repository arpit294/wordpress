<?php

namespace SureCart\Rest;

use SureCart\Controllers\Admin\Learn\LearnScriptsController;

/**
 * Boot data for the learn screen when the unified admin shell swaps it in
 * client-side — a direct page load localizes the same payload into scData,
 * so this endpoint is only hit on in-app navigation.
 */
class LearnBootRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'admin-boot';

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [];

	/**
	 * Register routes required to work.
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/learn',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => function () {
						return rest_ensure_response( LearnScriptsController::bootData() );
					},
					// Same capability the learn admin route requires.
					'permission_callback' => function () {
						return current_user_can( 'manage_options' );
					},
				],
			]
		);
	}
}
