<?php

namespace SureCart\WordPress\PostTypes;

use SureCart\Models\Form;
use SureCart\WordPress\Pages\PageService;
use WP_Post;

/**
 * Form post type service class.
 */
class FormPostTypeService {
	/**
	 * Holds the page service
	 *
	 * @var PageService
	 */
	protected $page_service;

	/**
	 * The default form name.
	 *
	 * @var string
	 */
	protected $default_form_name = 'checkout';

	/**
	 * The post type slug.
	 *
	 * @var string
	 */
	protected $post_type = 'sc_form';

	/**
	 * Group Prefix
	 *
	 * @var string
	 */
	protected $group_prefix = 'sc-checkout-';

	/**
	 * Get the page service from the application container.
	 *
	 * @param PageService $page_service Page serice.
	 */
	public function __construct( PageService $page_service ) {
		$this->page_service = $page_service;
	}

	/**
	 * Bootstrap the service.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'display_post_states', [ $this, 'displayDefaultFormStatus' ] );
		add_action( 'init', [ $this, 'registerPostType' ] );
		add_action( 'rest_api_init', [ $this, 'registerRestFields' ] );

		add_filter( "manage_{$this->post_type}_posts_columns", [ $this, 'postTypeColumns' ], 1 );
		add_filter( 'post_row_actions', [ $this, 'addDuplicateRowAction' ], 10, 2 );
		add_action( 'admin_notices', [ $this, 'showDuplicatedNotice' ] );
		add_filter( 'removable_query_args', [ $this, 'addRemovableQueryArgs' ] );
		add_action( 'in_admin_header', [ $this, 'showHeader' ] );
		add_action( "manage_{$this->post_type}_posts_custom_column", [ $this, 'postTypeContent' ], 10, 2 );
		add_action( 'use_block_editor_for_post', [ $this, 'forceGutenberg' ], 999, 2 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'pointEditorBackLinkAtModernList' ] );
		add_action( 'surecart/payments/mode', [ $this, 'forceTestModeForProvisionalAccounts' ] );
	}

	/**
	 * Force the payments mode to "test" if the account is not claimed.
	 *
	 * @param string $mode "test" or "live".
	 *
	 * @return string
	 */
	public function forceTestModeForProvisionalAccounts( $mode ) {
		if ( ! \SureCart::account()->claimed ) {
			return 'test';
		}

		return $mode;
	}

	/**
	 * Show the header.
	 **/
	public function showHeader() {
		global $typenow, $pagenow;
		if ( 'edit.php' !== $pagenow ) {
			return;
		}
		if ( $this->post_type !== $typenow ) {
			return;
		}

		return \SureCart::render(
			'layouts/partials/admin-header',
			[
				'breadcrumbs'         => [
					'forms' => [
						'title' => __( 'Checkout Forms', 'surecart' ),
					],
				],
				'claim_url'           => ! \SureCart::account()->claimed ? \SureCart::routeUrl( 'account.claim' ) : '',
				'claim_expired'       => \SureCart::account()->claim_expired ?? false,
				'enhanced_view_promo' => admin_url( 'admin.php?page=sc-forms' ),
			]
		);
	}

	/**
	 * Force gutenberg in case of classic editor
	 *
	 * @param boolean $use Whether to use Gutenberg.
	 * @param WP_Post $post Post object.
	 *
	 * @return boolean;
	 */
	public function forceGutenberg( $use, $post ) {
		if ( $this->post_type === $post->post_type ) {
			return true;
		}
		return $use;
	}

	/**
	 * Get the form post type.
	 *
	 * @return string post type.
	 */
	public function getPostType() {
		return $this->post_type;
	}


	/**
	 * Adds status indicator for this website.
	 *
	 * @param array $states States array.
	 *
	 * @return array States array with ours added
	 */
	public function displayDefaultFormStatus( $states ) {
		global $post;

		// bail if not our post type.
		if ( get_post_type( $post ) !== $this->post_type ) {
			return $states;
		}

		$checkout_form = \SureCart::post()->getFormPost(
			get_option( 'surecart_checkout_page_id' )
		) ?? null;

		if ( ( $checkout_form->ID ?? null ) === $post->ID ) {
			$states[] = __( 'Store Checkout', 'surecart' );
		}

		return $states;
	}

	/**
	 * Find a form by its option name.
	 *
	 * @return WP_Post|null
	 */
	public function findByOption() {
		return $this->page_service->get( $this->default_form_name, 'sc_form' );
	}

	/**
	 * Find a form by id.
	 *
	 * @param integer $id Post id.
	 * @return WP_Post|null
	 */
	public function findById( $id ) {
		return get_post( $id );
	}

	/**
	 * Find a form by id.
	 *
	 * @param integer $id Post id.
	 * @return WP_Post|null
	 */
	public function get( $id ) {
		return $this->findById( $id );
	}

	/**
	 * Get the default checkout form post.
	 *
	 * @return WP_Post|null
	 */
	public function getDefault() {
		$form_post = \SureCart::post()->getFormPost( get_option( 'surecart_checkout_page_id' ) );
		return $form_post ?? $this->findByOption();
	}

	/**
	 * Get the default checkout form post.
	 *
	 * @return int|null
	 */
	public function getDefaultId() {
		$form = $this->getDefault();
		return $form->ID ?? null;
	}

	/**
	 * Get the default group id.
	 *
	 * @return string.
	 */
	public function getDefaultGroupId() {
		$form = $this->getDefault();
		return $this->group_prefix . (int) $form->ID;
	}

	/**
	 * Register the post type
	 *
	 * @return void
	 */
	public function registerPostType() {
		register_post_type(
			$this->post_type,
			array(
				'labels'                => array(
					'name'                     => _x( 'Checkout Forms', 'post type general name', 'surecart' ),
					'singular_name'            => _x( 'Checkout Form', 'post type singular name', 'surecart' ),
					'add_new'                  => _x( 'Add New', 'Checkout Form', 'surecart' ),
					'add_new_item'             => __( 'Add new Checkout Form', 'surecart' ),
					'new_item'                 => __( 'New Checkout Form', 'surecart' ),
					'edit_item'                => __( 'Edit Checkout Form', 'surecart' ),
					'view_item'                => __( 'View Checkout Form', 'surecart' ),
					'all_items'                => __( 'All Checkout Forms', 'surecart' ),
					'search_items'             => __( 'Search Checkout Forms', 'surecart' ),
					'not_found'                => __( 'No checkout forms found.', 'surecart' ),
					'not_found_in_trash'       => __( 'No checkout forms found in Trash.', 'surecart' ),
					'filter_items_list'        => __( 'Filter checkout forms list', 'surecart' ),
					'items_list_navigation'    => __( 'Checkout Forms list navigation', 'surecart' ),
					'items_list'               => __( 'Checkout Forms list', 'surecart' ),
					'item_published'           => __( 'Checkout Form published.', 'surecart' ),
					'item_published_privately' => __( 'Checkout Form published privately.', 'surecart' ),
					'item_reverted_to_draft'   => __( 'Checkout Form reverted to draft.', 'surecart' ),
					'item_scheduled'           => __( 'Checkout Form scheduled.', 'surecart' ),
					'item_updated'             => __( 'Checkout Form updated.', 'surecart' ),
				),
				'public'                => false,
				'show_ui'               => true,
				'show_in_menu'          => false,
				'rewrite'               => false,
				'show_in_rest'          => true,
				'rest_base'             => 'sc-forms',
				'rest_controller_class' => 'WP_REST_Blocks_Controller',
				'capability_type'       => 'block',
				'capabilities'          => array(
					// You need to be able to edit posts, in order to read blocks in their raw form.
					'read'                   => 'edit_posts',
					// You need to be able to publish posts, in order to create blocks.
					'create_posts'           => 'publish_posts',
					'edit_posts'             => 'edit_posts',
					'edit_published_posts'   => 'edit_published_posts',
					'delete_published_posts' => 'delete_published_posts',
					'delete_posts'           => 'delete_posts',
					'edit_others_posts'      => 'edit_others_posts',
					'delete_others_posts'    => 'delete_others_posts',
				),
				'template'              => [
					[
						'surecart/form',
						[],
						[],
					],
				],
				'template_lock'         => 'all',
				'map_meta_cap'          => true,
				'supports'              => array(
					'title',
					'editor',
					'custom-fields',
					'revisions',
				),
			)
		);
	}

	/**
	 * Expose the form's payment mode to the REST API.
	 *
	 * It lives in the `surecart/form` block's attributes rather than a column,
	 * so the admin list would otherwise have to parse post content client-side.
	 *
	 * @return void
	 */
	public function registerRestFields() {
		register_rest_field(
			$this->post_type,
			'mode',
			[
				'get_callback'    => function ( $post ) {
					return Form::getMode( $post['id'] );
				},
				'update_callback' => null,
				'schema'          => [
					'description' => __( 'Payment mode of the form.', 'surecart' ),
					'type'        => 'string',
					'enum'        => [ 'live', 'test', '' ],
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
			]
		);
	}

	/**
	 * Send the form editor's "back" links to whichever list the store is using.
	 *
	 * The block editor builds those links as `edit.php?post_type=sc_form` in JS,
	 * with no filter to change them, so a delegated click handler retargets them
	 * while the modern list is active. Same hook the product content editor uses
	 * to adjust its own editor chrome.
	 *
	 * @return void
	 */
	public function pointEditorBackLinkAtModernList() {
		if ( ! is_admin() || ! get_option( 'surecart_enhanced_admin_views', true ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( ! $screen || $this->post_type !== $screen->post_type ) {
			return;
		}

		wp_add_inline_script(
			'wp-edit-post',
			sprintf(
				'( function () {
					var listUrl = %s;
					var postType = %s;
					document.addEventListener( "click", function ( event ) {
						var link = event.target && event.target.closest ? event.target.closest( "a[href*=\'edit.php\']" ) : null;
						if ( ! link ) {
							return;
						}
						var url;
						try {
							url = new URL( link.href, window.location.origin );
						} catch ( e ) {
							return;
						}
						// Only retarget the plain list link — Trash/filtered
						// links carry extra params and must keep working.
						if ( url.pathname.indexOf( "edit.php" ) === -1 ) {
							return;
						}
						var params = new URLSearchParams( url.search );
						if ( params.get( "post_type" ) !== postType ) {
							return;
						}
						params.delete( "post_type" );
						if ( Array.from( params.keys() ).length ) {
							return;
						}
						event.preventDefault();
						window.location.href = listUrl;
					} );
				} )();',
				wp_json_encode( admin_url( 'admin.php?page=sc-forms' ) ),
				wp_json_encode( $this->post_type )
			)
		);
	}

	/**
	 * Let WordPress strip the duplicated flag from the URL so the notice doesn't re-show on refresh.
	 *
	 * @param array $args Removable query args.
	 *
	 * @return array
	 */
	public function addRemovableQueryArgs( $args ) {
		$args[] = 'duplicated';
		return $args;
	}

	/**
	 * Add a "Duplicate" link to the form row actions.
	 *
	 * @param array    $actions Row actions.
	 * @param \WP_Post $post    Current post.
	 *
	 * @return array
	 */
	public function addDuplicateRowAction( $actions, $post ) {
		if ( $this->post_type !== $post->post_type || ! Form::canCreate() || ! current_user_can( 'edit_post', $post->ID ) ) {
			return $actions;
		}

		// Trashed forms can't be duplicated (see Form::duplicate), and WordPress
		// still runs this filter for them — don't offer a link that would fail.
		if ( 'trash' === $post->post_status ) {
			return $actions;
		}

		$url = \SureCart::getUrl()->editModel( 'duplicate_form', $post->ID, admin_url( 'admin.php' ) );

		$actions['duplicate'] = sprintf(
			'<a href="%1$s" aria-label="%2$s">%3$s</a>',
			esc_url( $url ),
			/* translators: %s: form title. */
			esc_attr( sprintf( __( 'Duplicate &#8220;%s&#8221;', 'surecart' ), get_the_title( $post ) ) ),
			esc_html__( 'Duplicate', 'surecart' )
		);

		return $actions;
	}

	/**
	 * Show a success notice on the forms list after duplicating.
	 *
	 * @return void
	 */
	public function showDuplicatedNotice() {
		global $typenow, $pagenow;

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display-only flag.
		if ( 'edit.php' !== $pagenow || $this->post_type !== $typenow || empty( $_GET['duplicated'] ) ) {
			return;
		}

		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Checkout form duplicated. The copy was saved as a draft.', 'surecart' ) . '</p></div>';
	}

	/**
	 * Filter the post type columns.
	 */
	public function postTypeColumns( $defaults ) {
		// add our components.
		\SureCart::assets()->enqueueComponents();

		$columns = array_merge(
			$defaults,
			array(
				'title'     => $defaults['title'],
				'public'    => __( 'Published In', 'surecart' ),
				'mode'      => __( 'Mode', 'surecart' ),
				'shortcode' => __( 'Shortcode', 'surecart' ),
			)
		);

		$v = $columns['date'];
		unset( $columns['date'] );
		$columns['date'] = $v;
		return $columns;
	}

	/**
	 * Post type content column.
	 *
	 * @param string  $column_name Column name.
	 * @param integer $post_ID Post ID.
	 * @return void
	 */
	public function postTypeContent( $column_name, $post_ID ) {
		if ( 'shortcode' === $column_name ) {
			$this->columnShortcode( $post_ID );
		}
		if ( 'public' === $column_name ) {
			$this->columnPosts( $post_ID );
		}
		if ( 'products' === $column_name ) {
			$this->columnProducts( $post_ID );
		}
		if ( 'mode' === $column_name ) {
			$this->columnMode( $post_ID );
		}
	}

	/**
	 * Get the form's mode.
	 *
	 * @param int $post_ID Post id.
	 * @return void
	 */
	public function columnMode( $post_ID ) {
		$mode = Form::getMode( $post_ID );
		if ( 'test' === $mode ) {
			echo '<sc-tag type="warning">' . esc_html__( 'Test', 'surecart' ) . '</sc-tag>';
			return;
		}

		echo '<sc-tag type="success">' . esc_html__( 'Live', 'surecart' ) . '</sc-tag>';
	}

	/**
	 * Get the shortcode for the current post.
	 *
	 * @param integer $post_ID Post ID.
	 * @return void
	 */
	public function columnShortcode( $post_ID ) {
		echo '<code>[sc_form id=' . (int) $post_ID . ']</code>';
	}

	/**
	 * Get the posts where this form appears.
	 *
	 * @param integer $post_ID Post ID.
	 * @return void
	 */
	public function columnPosts( $post_ID ) {
		$posts = Form::getPosts( $post_ID );

		$post_names = array_map(
			function ( $post ) {
				return '<a href="' . esc_url( get_edit_post_link( $post->ID ) ) . '">' . wp_kses_post( $post->post_title ? $post->post_title : esc_html__( '(no title)', 'surecart' ) ) . '</a>';
			},
			$posts,
		);

		echo wp_kses_post( implode( ', ', array_filter( $post_names ) ) );
	}

	/**
	 * Get the products that are in this form by default
	 *
	 * @param integer $post_ID Post ID.
	 * @return void
	 */
	public function columnProducts( $post_ID ) {
		$products = Form::getProducts( $post_ID );

		$product_names = array_map(
			function ( $product ) {
				return '<a href="' . esc_url( \SureCart::getUrl()->edit( 'product', $product->id ) ) . '">' . wp_kses_post( $product->name ) . '</a>';
			},
			$products,
		);

		echo implode( ', ', $product_names );
	}

	/**
	 * Get the SC forms list.
	 *
	 * @param array $args Form query data.
	 *
	 * @return array
	 */
	public function get_forms( $args = [] ) {
		$defaults = [
			'post_type'   => 'sc_form',
			'post_status' => 'publish',
			'order'       => 'DESC',
			'orderby'     => 'ID',
		];

		$args = wp_parse_args( $args, $defaults );

		return get_posts( $args );
	}
}
