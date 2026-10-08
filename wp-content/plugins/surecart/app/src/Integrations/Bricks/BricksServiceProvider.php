<?php

namespace SureCart\Integrations\Bricks;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Handles the Bricks Service.
 */
class BricksServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.bricks.elements']          = fn() => new BricksElementsService();
		$container['surecart.bricks.dynamic_data']      = fn() => new BricksDynamicDataService();
		$container['surecart.bricks.template']          = fn() => new BricksTemplateService();
		$container['surecart.bricks.duplicate_content'] = fn() => new BricksDuplicateContentService();
	}

	/**
	 * {@inheritDoc}
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		$container['surecart.bricks.elements']->bootstrap();
		$container['surecart.bricks.dynamic_data']->bootstrap();
		$container['surecart.bricks.template']->bootstrap();
		$container['surecart.bricks.duplicate_content']->bootstrap();
	}
}
