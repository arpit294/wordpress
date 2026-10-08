<?php

namespace SureCart\Integrations\Astra;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Handles the Astra integration.
 */
class AstraServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.plugins.astra'] = function () {
			return new AstraService();
		};
	}

	/**
	 * {@inheritDoc}
	 *
	 * @param \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		$container['surecart.plugins.astra']->bootstrap();
	}
}
