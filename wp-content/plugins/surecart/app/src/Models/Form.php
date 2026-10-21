<?php

namespace SureCart\Models;

use SureCart\Models\Product;

/**
 * Checkout form class
 */
class Form {
	/**
	 * Holds the form post.
	 *
	 * @var \WP_Post;
	 */
	protected $post;

	/**
	 * Get the post
	 *
	 * @param [type] $id
	 */
	final public function __construct( $id = 0 ) {
		$this->post = get_post( $id );
	}

	/**
	 * The form's post type
	 *
	 * @return string The post type.
	 */
	protected function getPostType() {
		// TODO: get this from registration.
		return 'sc_form';
	}

	/**
	 * Get the stored product choices
	 *
	 * @param int|WP_Post $id Post object or id.
	 * @return array
	 */
	protected function getPriceIds( $id ) {
		$this->post = get_post( $id );
		$blocks     = parse_blocks( $this->post->post_content );
		return $this->getNested( $blocks, 'price_id' );
	}

	/**
	 * Get a form's attribute
	 *
	 * @param string $attribute Attribute name.
	 * @return mixed
	 */
	public function getAttribute( $attribute ) {
		$blocks     = parse_blocks( $this->post->post_content );
		$form_block = $blocks[0] ?? false;
		if ( ! $form_block || 'surecart/form' !== $form_block['blockName'] ) {
			return '';
		}
		return $form_block['attrs'][ $attribute ] ?? null;
	}

	/**
	 * Get the form's mode
	 *
	 * @param int|WP_Post $id Post object or id.
	 * @return string
	 */
	protected function getMode( $id ) {
		$this->post = get_post( $id );
		if ( empty( $this->post ) ) {
			return null;
		}
		$blocks     = parse_blocks( $this->post->post_content );
		$form_block = $blocks[0] ?? false;
		if ( ! $form_block || 'surecart/form' !== $form_block['blockName'] ) {
			return '';
		}
		return apply_filters( 'surecart/payments/mode', $form_block['attrs']['mode'] ?? 'live' );
	}

	/**
	 * Get nested values from an array
	 *
	 * @param array  $array Array to search.
	 * @param string $nested_key Nested key to search for.
	 * @return array
	 */
	protected function getNested( array $array, $nested_key ) {
		$return = array();
		array_walk_recursive(
			$array,
			function( $a, $key ) use ( &$return, $nested_key ) {
				if ( $nested_key === $key ) {
					$return[] = $a;
				}
			}
		);
		return $return;
	}

	/**
	 * Get the form's products.
	 *
	 * @param int|WP_Post Block post id.
	 */
	protected function getProducts( $id ) {
		$ids = $this->getPriceIds( $id );
		// no products.
		if ( empty( $ids ) ) {
			return [];
		}

		// get prices with their product
		$prices = Price::where(
			[
				'ids' => $ids,
			]
		)->with( [ 'product' ] )->get();

		$products = [];
		foreach ( $prices as $price ) {
			$products[] = $price->product;
		}
		return $products;
	}

	protected function getPosts( $id ) {
		$blocks     = $this->searchBlocks( $id );
		$shortcodes = $this->searchShortcodes( $id );
		return array_merge( $blocks, $shortcodes );
	}

	public function searchBlocks( $id ) {
		return get_posts(
			[
				's'         => '<!-- wp:surecart/checkout-form {"id":' . (int) $id,
				'sentence'  => 1,
				'post_type' => 'any',
				'per_page'  => -1,
			]
		);
	}

	public function searchShortcodes( $id ) {
		return get_posts(
			[
				's'         => '[sc_form id=' . (int) $id,
				'sentence'  => 1,
				'post_type' => 'any',
				'per_page'  => -1,
			]
		);
	}

	/**
	 * Get blocks from the posts.
	 *
	 * @param array $posts Array of posts.
	 * @return array Array of blocks.
	 */
	public function getBlocksFromPosts( $posts ) {
		$blocks = [];
		foreach ( $posts as $post ) {
			$parsed_blocks = parse_blocks( $post->post_content );
			$blocks        = array_merge( $blocks, $this->findCheckoutBlocks( $parsed_blocks, $post ) );
		}
		return array_filter( $blocks );
	}

	/**
	 * Find our checkout block.
	 *
	 * @param array    $post_blocks Blocks array.
	 * @param \WP_Post $post_object Post object.
	 * @return array
	 */
	public function findCheckoutBlocks( $post_blocks, \WP_Post $post_object ) {
		$blocks = [];
		foreach ( $post_blocks as $block ) {
			if ( 'surecart/checkout-form' === $block['blockName'] ) {
				$block['post'] = $post_object;
				$blocks[]      = $block;
			} elseif ( ! empty( $block['innerBlocks'] ) ) {
				$blocks = array_merge( $blocks, $this->findCheckoutBlocks( $block['innerBlocks'], $post_object ) );
			}
		}

		return array_filter( $blocks );
	}

	/**
	 * Whether the current user can create checkout forms.
	 *
	 * @return boolean
	 */
	protected function canCreate() {
		$post_type = get_post_type_object( $this->getPostType() );
		return $post_type && current_user_can( $post_type->cap->create_posts );
	}

	/**
	 * Duplicate a form as a new draft, including its content and meta.
	 *
	 * @param integer $id Source form post id.
	 *
	 * @return integer|\WP_Error New post id, or error when the source is invalid or the user lacks permission.
	 */
	protected function duplicate( $id ) {
		$this->post = get_post( $id );
		if ( ! $this->post || $this->getPostType() !== $this->post->post_type ) {
			return new \WP_Error( 'sc_form_not_found', __( 'Checkout form not found.', 'surecart' ), [ 'status' => 404 ] );
		}

		if ( ! $this->canCreate() || ! current_user_can( 'edit_post', $this->post->ID ) ) {
			return new \WP_Error( 'sc_form_duplicate_forbidden', __( 'Sorry, you are not allowed to duplicate this checkout form.', 'surecart' ), [ 'status' => 403 ] );
		}

		// Both lists hide the action for trashed forms; refuse it here too so the
		// API can't produce a draft copy of something on its way out.
		if ( 'trash' === $this->post->post_status ) {
			return new \WP_Error( 'sc_form_duplicate_trashed', __( 'Restore this checkout form before duplicating it.', 'surecart' ), [ 'status' => 422 ] );
		}

		// wp_insert_post() expects slashed data; block content holds \uXXXX escapes that would otherwise be stripped.
		$new_id = wp_insert_post(
			wp_slash(
				[
					'post_type'    => $this->getPostType(),
					'post_status'  => 'draft',
					/* translators: %s: original form title. */
					'post_title'   => sprintf( __( '%s (Copy)', 'surecart' ), $this->post->post_title ),
					'post_content' => $this->post->post_content,
					'post_excerpt' => $this->post->post_excerpt,
				]
			),
			true
		);

		if ( is_wp_error( $new_id ) ) {
			return $new_id;
		}

		foreach ( get_post_meta( $this->post->ID ) as $key => $values ) {
			// editor locks are per-post state, not settings.
			if ( in_array( $key, [ '_edit_lock', '_edit_last' ], true ) ) {
				continue;
			}
			foreach ( $values as $value ) {
				// keyless get_post_meta() returns raw serialized values; unserialize so add_post_meta() re-serializes
				// cleanly, and slash because add_post_meta() unslashes string values before saving.
				add_post_meta( $new_id, $key, wp_slash( maybe_unserialize( $value ) ) );
			}
		}

		return $new_id;
	}

	/**
	 * Static Facade Accessor
	 *
	 * @param string $method Method to call.
	 * @param mixed  $params Method params.
	 *
	 * @return mixed
	 */
	public static function __callStatic( $method, $params ) {
		return call_user_func_array( [ new static(), $method ], $params );
	}
}
