<?php

namespace SureCart\Database;

/**
 * Run this migration when version changes or for new installations.
 */
class ProductPageMigrationService extends VersionMigration {
	/**
	 * The key for the migration.
	 *
	 * @var string
	 */
	protected $migration_key = 'surecart_product_page_migration_version';

	/**
	 * Run the migration.
	 *
	 * @return void
	 */
	public function run(): void {

		$args = array(
			'post_type'           => array( 'wp_template_part', 'wp_template' ), // specify the post types.
			'post_status'         => array( 'auto-draft', 'draft', 'publish' ), // specify the post status.
			'posts_per_page'      => -1,
			'lazy_load_term_meta' => false,
		);

		$query     = new \WP_Query( $args );
		$templates = $query->posts ?? array();

		if ( empty( $templates ) ) {
			return;
		}

		// filter out the templates that have post_name as product.
		// `single-product` is deliberately absent from the list because it is a legacy template that is no longer used.
		$product_templates = array_filter(
			$templates,
			function ( $template ) {
				return in_array( $template->post_name, array( 'product-info' ), true ) ||
				strpos( $template->post_name, 'sc-part-products-info-' ) !== false ||
				strpos( $template->post_name, 'sc-products-' ) !== false;
			}
		);

		// if we don't have any product templates, return.
		if ( empty( $product_templates ) ) {
			return;
		}

		// update each template if it doesn't have the wp:surecart/product-page block.
		foreach ( $product_templates as $product_template ) {
			// thread one content variable through both transforms so the second
			// doesn't overwrite the first with the original post content.
			$content = $product_template->post_content;

			if ( ! has_block( 'surecart/product-page', $content ) ) {
				$content = '<!-- wp:surecart/product-page {"align":"wide"} -->' . $content . '<!-- /wp:surecart/product-page -->';
			}

			if ( ! has_block( 'surecart/product-selected-price-ad-hoc-amount', $content ) ) {
				$insert_before_block = has_block( 'surecart/product-buy-buttons', $content ) ? 'surecart/product-buy-buttons' : 'surecart/product-buy-button';

				$content = str_replace(
					'<!-- wp:' . $insert_before_block,
					'<!-- wp:surecart/product-selected-price-ad-hoc-amount /-->' . PHP_EOL . '<!-- wp:' . $insert_before_block,
					$content
				);
			}

			// only save when something actually changed — an unconditional save
			// would re-run every merchant-customized template through the save
			// pipeline on every plugin update.
			if ( $content === $product_template->post_content ) {
				continue;
			}

			$result = $this->updatePostContent( $product_template->ID, $content );

			// a failed update defers completion so the next admin_init retries (see VersionMigration::complete()).
			if ( is_wp_error( $result ) || empty( $result ) ) {
				$this->failed = true;
			}
		}
	}
}
