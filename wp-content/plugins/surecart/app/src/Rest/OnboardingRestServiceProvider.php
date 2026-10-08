<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\OnboardingController;
use SureCart\Rest\RestServiceInterface;

/**
 * Service provider for onboarding "Complete Site" REST endpoints.
 *
 * The `install`/`status` routes are generic "install and activate by slug"
 * actions, not tied to any one template.
 *
 * Starter Templates AJAX interop hooks live in
 * {@see \SureCart\WordPress\Admin\StarterTemplates\StarterTemplatesAjaxBridgeServiceProvider}
 * instead of here, so this provider stays a pure REST route provider.
 */
class OnboardingRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Rest controller.
	 *
	 * @var string
	 */
	protected $controller = OnboardingController::class;

	/**
	 * The endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'onboarding';

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function registerModelRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/install',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => $this->callback( $this->controller, 'install' ),
					'permission_callback' => [ $this, 'get_items_permission_check' ],
					'args'                => [
						'requirements' => [
							'type'     => 'array',
							'required' => true,
						],
					],
				],
			]
		);

		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/status',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => $this->callback( $this->controller, 'status' ),
					'permission_callback' => [ $this, 'get_items_permission_check' ],
					'args'                => [
						'requirements' => [
							'type'     => 'array',
							'required' => true,
						],
					],
				],
			]
		);
	}

	/**
	 * Only administrators may install plugins/themes.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error
	 */
	public function get_items_permission_check( $request ) {
		return current_user_can( 'manage_options' );
	}
}
