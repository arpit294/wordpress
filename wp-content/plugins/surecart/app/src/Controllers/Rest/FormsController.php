<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Form;

/**
 * Handle form actions that WordPress's own post endpoints don't cover.
 *
 * Forms are `sc_form` posts, so reads, updates and deletes all go through
 * `/wp/v2/sc-forms`.
 */
class FormsController {
	/**
	 * Copy a form, content and meta included, as a draft.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function duplicate( \WP_REST_Request $request ) {
		// Shared with the classic list's row action.
		$duplicate_id = Form::duplicate( (int) $request['id'] );

		if ( is_wp_error( $duplicate_id ) ) {
			return $duplicate_id;
		}

		return rest_ensure_response(
			[
				'id'        => $duplicate_id,
				'edit_link' => get_edit_post_link( $duplicate_id, 'raw' ),
			]
		);
	}
}
