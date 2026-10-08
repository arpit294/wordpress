<div class="wrap">
	<?php \SureCart::render( 'layouts/partials/admin-index-styles' ); ?>
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'            => __( 'Orders', 'surecart' ),
			'new_link'         => \SureCart::getUrl()->create( 'invoices' ) . '&live_mode=true',
			'export_resources' => [
				[
					'resource' => 'orders',
					'label'    => __( 'Orders', 'surecart' ),
				],
				[
					'resource' => 'line_items',
					'label'    => __( 'Line Items', 'surecart' ),
				],
				[
					'resource' => 'charges',
					'label'    => __( 'Charges', 'surecart' ),
				],
				[
					'resource' => 'refunds',
					'label'    => __( 'Refunds', 'surecart' ),
				],
				[
					'resource' => 'purchases',
					'label'    => __( 'Purchases', 'surecart' ),
				],
			],
		]
	);
	?>

	<?php $table->search_form( __( 'Search Orders', 'surecart' ), 'sc-search-orders' ); ?>

	<form id="posts-filter" method="get">

		<?php $table->views(); ?>
		<?php $table->display(); ?>

		<div id="ajax-response"></div>
	</form>
</div>

