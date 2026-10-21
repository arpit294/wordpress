<?php

namespace SureCart\Models\Wordpress;

use SureCart\Models\Concerns\Facade;

/**
 * This class syncs product records to WordPress posts.
 */
class Collection {
	use Facade;

	/**
	 * The synced term.
	 *
	 * @var \WP_Term
	 */
	protected $term;

	/**
	 * The taxonomy.
	 *
	 * @var string
	 */
	protected $taxonomy = 'sc_collection';

	/**
	 * Find the post from the model.
	 *
	 * @param string $model_id The model id.
	 *
	 * @return \WP_Term|\WP_Error|null
	 */
	protected function findByModelId( string $model_id ) {
		// if we don't have a model id, return null.
		if ( empty( $model_id ) ) {
			return null;
		}

		// get term by sc_id.
		$terms = get_terms(
			array(
				'taxonomy'   => $this->taxonomy,
				'meta_key'   => 'sc_id',
				'meta_value' => $model_id,
				'number'     => 1,
				'hide_empty' => false,
			)
		);

		// handle error.
		if ( is_wp_error( $terms ) ) {
			return $terms;
		}

		// return the post.
		return apply_filters( 'surecart_get_collection_term', $terms[0] ?? null, $model_id, $this );
	}

	/**
	 * Sync the model with the post.
	 *
	 * @param \SureCart\Models\ProductCollection $model The model.
	 *
	 * @return \WP_Term|\WP_Error
	 */
	protected function sync( \SureCart\Models\ProductCollection $model ) {
		$this->term = $this->findByModelId( $model->id );

		if ( is_wp_error( $this->term ) ) {
			return $this->term;
		}

		return empty( $this->term->term_id ) ? $this->create( $model ) : $this->update( $model );
	}

	/**
	 * Delete the synced post.
	 *
	 * @param string $id The model id.
	 *
	 * @return bool|int|\WP_Error
	 */
	protected function delete( string $id ) {
		$this->term = $this->findByModelId( $id );

		if ( is_wp_error( $this->term ) ) {
			return $this->term;
		}

		// force delete post.
		return wp_delete_term( $this->term->term_id, $this->taxonomy );
	}

	/**
	 * Create the term.
	 *
	 * @param \SureCart\Models\ProductCollection $collection The collection model.
	 *
	 * @return \WP_Term|\WP_Error|null
	 */
	protected function create( \SureCart\Models\ProductCollection $collection ) {
		// don't do these actions as they can slow down the sync.
		foreach ( [ 'do_pings', 'transition_post_status', 'save_post', 'pre_post_update', 'add_attachment', 'edit_attachment', 'edit_post', 'term_updated', 'wp_insert_term' ] as $action ) {
			remove_all_actions( $action );
		}

		// we are importing.
		if ( ! defined( 'WP_IMPORTING' ) ) {
			define( 'WP_IMPORTING', true );
		}

		$term = wp_insert_term(
			$collection->name,
			$this->taxonomy,
			[
				'name'        => $collection->name,
				'description' => $collection->description,
				'slug'        => $collection->slug,
			]
		);

		// a same-named term can already exist (e.g. created directly in the taxonomy
		// before the platform collection) — adopt it instead of failing, but only if
		// it isn't already linked to another collection.
		if ( is_wp_error( $term ) && 'term_exists' === $term->get_error_code() ) {
			$existing = get_term( (int) $term->get_error_data( 'term_exists' ), $this->taxonomy );
			if ( $existing instanceof \WP_Term && empty( get_term_meta( $existing->term_id, 'sc_id', true ) ) ) {
				$this->term = $existing;
				return $this->update( $collection );
			}
		}

		// handle errors.
		if ( is_wp_error( $term ) ) {
			return $term;
		}

		$this->term = get_term( $term['term_id'], $this->taxonomy );

		if ( is_wp_error( $this->term ) || empty( $this->term ) ) {
			return $this->term;
		}

		update_term_meta( $this->term->term_id, 'sc_account', \SureCart::account()->id );
		update_term_meta( $this->term->term_id, 'sc_id', $collection->id );
		update_term_meta( $this->term->term_id, 'collection', $collection->toArray() );

		return $this->term;
	}

	/**
	 * Update the term.
	 *
	 * @param \SureCart\Models\ProductCollection $collection The collection model.
	 *
	 * @return \WP_Term|\WP_Error|null
	 */
	protected function update( \SureCart\Models\ProductCollection $collection ) {
		// find the post.
		if ( empty( $this->term ) || ! is_a( $this->term, 'WP_Term' ) ) {
			$this->term = $this->findByModelId( $collection->id );
		}

		$term = wp_update_term(
			$this->term->term_id,
			$this->taxonomy,
			[
				'name'        => $collection->name,
				'description' => $collection->description,
				'slug'        => $collection->slug,
			]
		);

		// handle errors.
		if ( is_wp_error( $term ) ) {
			return $term;
		}

		update_term_meta( $term['term_id'], 'sc_account', \SureCart::account()->id );
		update_term_meta( $term['term_id'], 'sc_id', $collection->id );
		update_term_meta( $term['term_id'], 'collection', $collection->toArray() );

		$this->term = get_term( $term['term_id'], $this->taxonomy );

		return $this->term;
	}
}
