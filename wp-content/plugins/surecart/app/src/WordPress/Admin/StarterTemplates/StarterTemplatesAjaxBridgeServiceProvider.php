<?php

namespace SureCart\WordPress\Admin\StarterTemplates;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Bridges onboarding's "Complete Site" flow with the third-party Starter
 * Templates (Astra Sites) plugin's own admin-ajax handlers.
 *
 * Kept separate from OnboardingRestServiceProvider so that provider stays a
 * pure REST route provider, consistent with the other Rest\*ServiceProvider
 * classes — this one only patches Starter Templates' `wp_ajax_astra-sites-*`
 * actions.
 */
class StarterTemplatesAjaxBridgeServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service Container.
	 * @return void
	 */
	public function register( $container ) {}

	/**
	 * Bootstrap the Starter Templates interop hooks.
	 *
	 * @param \Pimple\Container $container Service Container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		$interop = new StarterTemplatesAjaxInterop();

		// Starter Templates verifies required plugins by exact `init` path,
		// which never passes for a plugin running from a renamed folder —
		// remap to the real files before its handler reads the payload.
		add_action(
			'wp_ajax_astra-sites-verify-required-plugins',
			[ $interop, 'remapVerifyRequiredPlugins' ],
			0
		);

		// A WXR import that dies mid-run leaves the importer's progress lock
		// behind, silently breaking every retry until it expires — clear it
		// before each prepare (any lock at prepare time is stale).
		add_action(
			'wp_ajax_astra-sites-import_prepare_xml',
			[ $interop, 'clearStaleWxrImportLock' ],
			0
		);
	}
}
