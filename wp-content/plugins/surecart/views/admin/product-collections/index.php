<div class="wrap">
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'           => __( 'Product Collections', 'surecart' ),
			'new_link'        => \SureCart::getUrl()->edit( 'product_collection' ),
			'import_resource' => 'product_collections',
		]
	);
	?>

	<?php $table->search_form( __( 'Search product collections', 'surecart' ), 'sc-search-products' ); ?>
	<?php $table->display(); ?>
</div>
