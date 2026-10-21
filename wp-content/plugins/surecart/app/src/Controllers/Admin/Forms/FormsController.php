<?php

namespace SureCart\Controllers\Admin\Forms;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\RendersEnhancedAdminView;
use SureCart\Models\Form;

/**
 * Handles the Checkout Forms admin list.
 *
 * Unlike the other migrated lists there is no legacy `WP_List_Table` here — the
 * classic view is WordPress's own `edit.php` screen for the `sc_form` post type,
 * so the classic branch simply hands the user back to it.
 */
class FormsController extends AdminController {
	use RendersEnhancedAdminView;

	/**
	 * Render the DataViews SPA view for custom forms.
	 */
	protected function renderSpaView() {
		$this->enqueueSpaScripts( FormsScriptsController::class );

		$this->preloadPaths(
			[
				'/wp/v2/users/me?context=edit',
				'/wp/v2/types?context=view',
				'/wp/v2/types?context=edit',
				// Must match the list's first request exactly (see FORMS_FIELDS in
				// packages/admin/forms/list/buildQuery.js) or the preload is wasted.
				'/wp/v2/sc-forms?context=edit&_fields=id%2Ctitle%2Cstatus%2Cdate%2Cmodified%2Cmode&per_page=20&page=1&orderby=date&order=desc&status=any',
			]
		);

		return $this->renderSpaShell( 'admin/forms/spa', 'forms' );
	}

	/**
	 * The classic list lives on the core post-type screen (see
	 * `AdminPageRegistry::CLASSIC_VIEW_URLS` for the toggle's return URL).
	 */
	protected function renderWpListView() {
		return \SureCart::redirect()->to( admin_url( 'edit.php?post_type=sc_form' ) );
	}

	/**
	 * Duplicate a checkout form and redirect back to the forms list.
	 *
	 * Serves the classic list's row action. The DataViews list calls
	 * `/surecart/v1/forms/{id}/duplicate` instead; both go through
	 * `Form::duplicate()`.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 *
	 * @return \SureCartCore\Responses\RedirectResponse
	 */
	public function duplicate( $request ) {
		$duplicated = Form::duplicate( (int) $request->query( 'id' ) );

		if ( is_wp_error( $duplicated ) ) {
			wp_die(
				esc_html( $duplicated->get_error_message() ),
				'',
				[ 'response' => (int) ( ( (array) $duplicated->get_error_data() )['status'] ?? 403 ) ]
			);
		}

		return \SureCart::redirect()->to(
			esc_url_raw(
				add_query_arg(
					[
						'post_type'  => \SureCart::forms()->getPostType(),
						'duplicated' => true,
					],
					admin_url( 'edit.php' )
				)
			)
		);
	}
}
