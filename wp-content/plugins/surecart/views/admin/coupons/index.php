<div class="wrap">
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'            => __( 'Coupons', 'surecart' ),
			'new_link'         => \SureCart::getUrl()->edit( 'coupon' ),
			'export_resources' => [
				[
					'resource' => 'coupons',
					'label'    => __( 'Coupons', 'surecart' ),
				],
				[
					'resource' => 'promotions',
					'label'    => __( 'Promotion Codes', 'surecart' ),
				],
			],
		]
	);
	?>

	<?php $table->search_form( __( 'Search Coupons', 'surecart' ), 'sc-search-coupons' ); ?>
	<?php $table->display(); ?>
</div>
