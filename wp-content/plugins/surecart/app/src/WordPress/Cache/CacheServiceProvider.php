<?php

namespace SureCart\WordPress\Cache;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Cache Service Provider.
 */
class CacheServiceProvider implements ServiceProviderInterface {
	/**
	 * Holds the service container.
	 *
	 * @var \Pimple\Container
	 */
	protected $container;

	/**
	 * Register all dependencies in the container.
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function register( $container ) {
		$container['surecart.litespeed_cache']              = function () {
			return new LiteSpeedCacheService();
		};
		$container['surecart.wpfastest_cache']              = function () {
			return new WpFastestCacheService();
		};
		$container['surecart.w3total_cache']                = function () {
			return new W3TotalCacheService();
		};
		$container['surecart.donotcache_page']              = function () {
			return new DoNotCachePageService();
		};
		$container['surecart.migrations.wprocket_config']   = function () {
			return new WpRocketConfigMigrationService();
		};
		$container['surecart.wprocket_cache']               = function () use ( $container ) {
			return new WpRocketCacheService( $container['surecart.migrations.wprocket_config'] );
		};
		$container['surecart.perfmatters_cache']            = function () {
			return new PerfmattersCacheService();
		};
		$container['surecart.migrations.siteground_config'] = function () {
			return new SiteGroundConfigMigrationService();
		};
		$container['surecart.siteground_cache']             = function () use ( $container ) {
			return new SiteGroundCacheService( $container['surecart.migrations.siteground_config'] );
		};
	}

	/**
	 * Bootstrap any services if needed.
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		// Bootstrap cache services on 'plugins_loaded' to ensure all plugins
		// are loaded before we check for active cache plugins.
		add_action(
			'plugins_loaded',
			function () use ( $container ) {
				$container['surecart.litespeed_cache']->bootstrap();
				$container['surecart.wpfastest_cache']->bootstrap();
				$container['surecart.w3total_cache']->bootstrap();
				$container['surecart.donotcache_page']->bootstrap();
				$container['surecart.wprocket_cache']->bootstrap();
				$container['surecart.perfmatters_cache']->bootstrap();
				$container['surecart.siteground_cache']->bootstrap();
			},
			999 // Late priority to ensure it runs after most plugins have loaded.
		);
	}
}
