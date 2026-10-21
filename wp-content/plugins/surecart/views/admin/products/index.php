<div class="wrap">
	<?php \SureCart::render( 'layouts/partials/admin-index-styles' ); ?>
	<?php \SureCart::render( 'layouts/partials/admin-product-list-styles' ); ?>
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'            => __( 'Products', 'surecart' ),
			'new_link'         => \SureCart::getUrl()->edit( 'product' ),
			'import_resource'  => 'products',
			'export_resources' => [
				[
					'resource' => 'prices',
					'label'    => __( 'Prices', 'surecart' ),
				],
				[
					'resource' => 'variants',
					'label'    => __( 'Variants', 'surecart' ),
				],
			],
		]
	);
	?>

	<?php $table->search_form( __( 'Search Products', 'surecart' ), 'sc-search-products' ); ?>

	<form id="products-filter" method="get">
		<?php $table->views(); ?>
		<?php $table->display(); ?>
	</form>
</div>
