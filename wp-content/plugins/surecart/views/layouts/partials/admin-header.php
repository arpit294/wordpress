<style>
	#sc-admin-header {
		background-color: #fff;
		width: calc(100% + 20px);
		/* Logical: covers #wpcontent's inline-start padding in RTL too. */
		margin-inline-start: -20px;
	}

	#sc-admin-container {
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#sc-admin-title {
		margin: 0;
		font-size: var(--sc-font-size-large);
	}

	.sc-admin-suffix {
		display: flex;
		width: 16rem;
		align-items: center;
		justify-content: flex-end;
		gap: 1em;
	}

	/* Mobile: the 16rem suffix slot squeezes the breadcrumb onto two lines. */
	@media screen and (max-width: 782px) {
		#sc-admin-container {
			padding: 10px 12px;
		}
		.sc-admin-suffix {
			display: none;
		}
	}
</style>

<div id="sc-admin-header"<?php echo ! empty( $hidden ) ? ' style="display:none"' : ''; ?>>
	<?php if ( ! empty( $claim_url ) || ! empty( $claim_expired ) ) : ?>
		<sc-provisional-banner claim-url="<?php echo esc_url( $claim_url ); ?>" expired="<?php echo ! empty( $claim_expired ) ? 'true' : 'false'; ?>"></sc-provisional-banner>
	<?php endif; ?>
	<div id="sc-admin-container">
		<?php if ( ! empty( $breadcrumbs ) ) : ?>
			<sc-breadcrumbs style="font-size: 16px">
				<sc-breadcrumb>
					<img style="display: block" src="<?php echo esc_url( trailingslashit( plugin_dir_url( SURECART_PLUGIN_FILE ) ) . 'images/logo.svg' ); ?>" alt="SureCart" width="125">
				</sc-breadcrumb>
				<?php foreach ( $breadcrumbs as $breadcrumb ) : ?>
					<sc-breadcrumb><?php echo esc_html( $breadcrumb['title'] ?? '' ); ?></sc-breadcrumb>
				<?php endforeach; ?>
			</sc-breadcrumbs>
		<?php endif; ?>
		<?php
		// Swappable pages always get the toggle and report slots; menuSync.js shows/hides them.
		// Derived here, not in withHeader(): FormPostTypeService renders this partial directly.
		$has_slots = ! empty( $swappable ) || ! empty( $enhanced_view_promo );
		?>
		<?php if ( ! empty( $suffix ) || ! empty( $report_url ) || $has_slots ) : ?>
		<div class="sc-admin-suffix">
			<?php
			if ( ! empty( $suffix ) ) {
				echo wp_kses_post( $suffix );
			}
			?>
			<?php
			if ( $has_slots ) {
				\SureCart::render(
					'layouts/partials/enhanced-views-promo',
					[
						'return_url' => is_string( $enhanced_view_promo ) ? $enhanced_view_promo : admin_url(),
						'hidden'     => empty( $enhanced_view_promo ),
					]
				);
			}
			?>
			<?php
			if ( ! empty( $report_url ) || $has_slots ) {
				?>
				<sc-button
					id="sc-admin-report-link"
					type="default"
					size="medium"
					href="<?php echo esc_url( $report_url ?? '' ); ?>"
					target="_blank"
					<?php echo empty( $report_url ) ? 'style="display:none"' : ''; ?>
				>
					<sc-icon name="bar-chart-2" slot="prefix"></sc-icon>
					<?php esc_html_e( 'View Reports', 'surecart' ); ?>
					<sc-icon name="external-link" slot="suffix"></sc-icon>
				</sc-button>
				<?php
			}
			?>
		</div>
		<?php endif; ?>
	</div>
</div>
