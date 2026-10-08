<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\FormsController;
use SureCart\Models\Form;

/**
 * Service provider for the form REST requests.
 *
 * Forms are `sc_form` posts, so CRUD stays on `/wp/v2/sc-forms`. This route only
 * covers duplication, which WordPress has no equivalent for.
 */
class FormsRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'forms';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = FormsController::class;

	/**
	 * Empty on purpose — `registerRoutes()` below registers only the
	 * `duplicate` route; the standard CRUD routes are never exposed
	 * (forms are a WP post type, served by core REST).
	 *
	 * @var array
	 */
	protected $methods = [];

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\d+)/duplicate',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => $this->callback( $this->controller, 'duplicate' ),
					'permission_callback' => [ $this, 'duplicate_item_permissions_check' ],
					'args'                => [
						'id' => [
							'description' => esc_html__( 'Form post id.', 'surecart' ),
							'type'        => 'integer',
							'required'    => true,
						],
					],
				],
			]
		);
	}

	/**
	 * Duplicating a form creates a new one.
	 *
	 * `Form::canCreate()` reads the post type's own `create_posts` cap, so this
	 * stays in step with the classic list's row action. `Form::duplicate()` is
	 * still the authority on the source form itself (missing, wrong type, trashed).
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return true|\WP_Error
	 */
	public function duplicate_item_permissions_check( $request ) {
		if ( ! Form::canCreate() || ! current_user_can( 'edit_post', (int) $request['id'] ) ) {
			return new \WP_Error(
				'surecart_cannot_duplicate_form',
				esc_html__( 'You are not allowed to duplicate this form.', 'surecart' ),
				[ 'status' => rest_authorization_required_code() ]
			);
		}

		return true;
	}
}
