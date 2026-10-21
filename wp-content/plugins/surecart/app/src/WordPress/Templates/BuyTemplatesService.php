<?php

declare(strict_types=1);

namespace SureCart\WordPress\Templates;

/**
 * The Buy (instant checkout) page query service.
 *
 * The /buy/ rewrite only maps sc_checkout_product_id, so the main query
 * falls through to the blog index (is_home). This injects the mirrored
 * sc_product post so SEO plugins (which read the main query) see a
 * singular product instead of blog-index canonical/robots/OG tags.
 */
class BuyTemplatesService {
	/**
	 * Bootstrap actions and filters.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter( 'posts_pre_query', [ $this, 'overrideBuyPostQuery' ], 10, 2 );
	}

	/**
	 * Filters the posts array before the query takes place to return the mirrored product post.
	 * Return a non-null value to bypass WordPress' default post queries.
	 *
	 * @param \WP_Post[]|int[]|null $posts Return an array of post data to short-circuit WP's query,
	 *                                     or null to allow WP to run its normal queries.
	 * @param \WP_Query             $wp_query The WP_Query instance (passed by reference).
	 *
	 * @return \WP_Post[]|null Array of post data, or null to allow WP to run its normal queries.
	 */
	public function overrideBuyPostQuery( $posts, \WP_Query $wp_query ) {
		$slug = isset( $wp_query->query['sc_checkout_product_id'] ) ? $wp_query->query['sc_checkout_product_id'] : null;
		if ( ! $slug ) {
			return $posts;
		}

		// feeds/embeds render before template_include — the controller's permission gate never runs there.
		if ( $wp_query->is_feed() || $wp_query->is_embed() ) {
			return $posts;
		}

		$found = $this->findMirroredPost( $slug );

		// no mirrored post (e.g. an id was passed) — the controller redirects or 404s.
		if ( empty( $found ) ) {
			return $posts;
		}

		// unpublished mirrors have no live product page — point SEO canonicals at the
		// buy link here, since Rank Math memoizes its canonical before template_include.
		if ( 'publish' !== $found->post_status ) {
			$url = trailingslashit( get_home_url() ) . trailingslashit( \SureCart::settings()->permalinks()->getBase( 'buy_page' ) ) . $slug;
			add_filter( 'rank_math/frontend/canonical', fn() => $url );
			add_filter( 'wpseo_canonical', fn() => $url );
			add_filter( 'get_canonical_url', fn() => $url );
		}

		// clone as publish so core's post-query status gate doesn't 404 draft/archived mirrors.
		$post              = clone $found;
		$post->post_status = 'publish';

		$posts = [ $post ];

		$wp_query->found_posts       = 1;
		$wp_query->max_num_pages     = 1;
		$wp_query->is_singular       = true;
		$wp_query->is_single         = true;
		$wp_query->is_archive        = false;
		$wp_query->is_tax            = false;
		$wp_query->is_home           = false;
		$wp_query->is_search         = false;
		$wp_query->is_404            = false;
		// queried_object is a real, publicly-routable post, but redirect_canonical() never
		// fires: its permalink-mismatch checks key off $_GET['p']/'name'/'page_id', none of
		// which the /buy/ rewrite ever populates.
		$wp_query->queried_object    = $post;
		$wp_query->queried_object_id = $post->ID;

		return $posts;
	}

	/**
	 * Find the mirrored product post for a buy page slug.
	 *
	 * Publish is checked first — drafts are exempt from wp_unique_post_slug,
	 * so a stale draft mirror can share the slug and would win on date order.
	 *
	 * @param string $slug The product slug.
	 *
	 * @return \WP_Post|null The mirrored post, or null when none exists.
	 */
	protected function findMirroredPost( $slug ) {
		foreach ( [ [ 'publish' ], [ 'draft', 'sc_archived' ] ] as $statuses ) {
			$found = get_posts(
				[
					'name'             => $slug,
					'post_type'        => 'sc_product',
					'post_status'      => $statuses,
					'numberposts'      => 1,
					// forceAccountIdScope() only scopes to the connected account when this is falsy.
					'suppress_filters' => false,
				]
			);

			if ( ! empty( $found[0] ) ) {
				return $found[0];
			}
		}

		return null;
	}
}
