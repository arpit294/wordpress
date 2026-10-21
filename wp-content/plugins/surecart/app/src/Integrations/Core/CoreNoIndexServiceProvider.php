<?php

namespace SureCart\Integrations\Core;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Handles the core robots meta fallback.
 */
class CoreNoIndexServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.plugins.core_noindex'] = function () {
			return new CoreNoIndexService();
		};
	}

	/**
	 * {@inheritDoc}
	 *
	 * @param \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		$container['surecart.plugins.core_noindex']->bootstrap();
	}
}
