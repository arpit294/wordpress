<div class="wrap">
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'           => __( 'Affiliates', 'surecart' ),
			'export_resource' => 'affiliations',
		]
	);
	?>

	<?php $table->search_form( __( 'Search', 'surecart' ), 'sc-search-affiliates' ); ?>

	<form id="affiliates-filter" method="get">
		<?php $table->views(); ?>
		<?php $table->display(); ?>
	</form>
</div>
