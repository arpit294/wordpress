<?php

namespace SureCart\WordPress;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Register translations.
 */
class TranslationsServiceProvider implements ServiceProviderInterface {
	/**
	 * WP_Scripts instances that already printed the catalog, keyed by spl_object_id.
	 * Holding the instance keeps PHP from reusing its id mid-request.
	 *
	 * @var \WP_Scripts[]
	 */
	protected $catalog_printed_for = [];

	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		// Nothing to register.
	}

	/**
	 * Bootstrap the service.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		add_filter( 'loco_compile_single_json', [ $this, 'compileSingleJSON' ], 999, 2 );
		add_filter( 'load_script_translation_file', [ $this, 'loadSingleTranslationFile' ], 999, 3 );
		add_filter( 'pre_load_script_translations', [ $this, 'skipPrintedCatalog' ], 10, 4 );
		add_filter( 'load_script_translations', [ $this, 'markCatalogPrinted' ], 10, 4 );
		add_action( 'init', [ $this, 'loadPluginTextDomain' ], 0 );
	}

	/**
	 * Print the surecart JS catalog once per document instead of once per script handle.
	 *
	 * Every handle shares the same whole-domain JSON, so the block editor was inlining it ~150
	 * times (~40 MB). The editor canvas iframe is its own document with its own WP_Scripts, so
	 * the check is per instance rather than per request.
	 *
	 * @param string|false|null $translations Short-circuit value.
	 * @param string|false      $file         Translation file path.
	 * @param string            $handle       Script handle.
	 * @param string            $domain       Text domain.
	 *
	 * @return string|false|null
	 */
	public function skipPrintedCatalog( $translations, $file, $handle, $domain ) {
		if ( 'surecart' === $domain && isset( $this->catalog_printed_for[ spl_object_id( wp_scripts() ) ] ) ) {
			return false;
		}
		return $translations;
	}

	/**
	 * Remember that this WP_Scripts instance has printed the catalog.
	 *
	 * Runs after a successful file read on purpose: WP retries a missed path with $file = false,
	 * and marking on the first attempt would swallow that retry.
	 *
	 * @param string       $translations JSON catalog.
	 * @param string|false $file         Translation file path.
	 * @param string       $handle       Script handle.
	 * @param string       $domain       Text domain.
	 *
	 * @return string
	 */
	public function markCatalogPrinted( $translations, $file, $handle, $domain ) {
		if ( 'surecart' === $domain && $translations ) {
			$scripts = wp_scripts();

			$this->catalog_printed_for[ spl_object_id( $scripts ) ] = $scripts;
		}
		return $translations;
	}

	/**
	 * Compile javascript translations as a single file.
	 * We need to do this since we lazy load a lot of our scripts.
	 *
	 * @param string $path Path for the json file.
	 * @param string $po_path Path of the po.
	 *
	 * @return string
	 */
	public function compileSingleJSON( $path, $po_path ) {
		$info = pathinfo( $po_path );
		if ( 'surecart' === substr( $info['filename'], 0, 8 ) ) {
			$path = $info['dirname'] . '/' . $info['filename'] . '.json';
		}
		return $path;
	}

	/**
	 * Load the single translation file when the domain loads.
	 *
	 * @param string $file The file.
	 * @param string $handle The script handle.
	 * @param string $domain The domain.
	 *
	 * @return string
	 */
	public function loadSingleTranslationFile( $file, $handle, $domain ) {
		if ( 'surecart' === $domain ) {
			$locale = apply_filters( 'plugin_locale', determine_locale(), 'surecart' );

			if ( ! file_exists( $file ) && file_exists( WP_LANG_DIR . '/loco/plugins/surecart-' . $locale . '.json' ) ) {
				return WP_LANG_DIR . '/loco/plugins/surecart-' . $locale . '.json';
			}
			if ( file_exists( WP_LANG_DIR . '/plugins/surecart-' . $locale . '.json' ) ) {
				return WP_LANG_DIR . '/plugins/surecart-' . $locale . '.json';
			}
			if ( is_string( $file ) ) {
				if ( false !== strpos( $file, SURECART_PLUGIN_DIR_NAME . '/languages/' ) ) {
					$first_part = substr( $file, 0, strpos( $file, SURECART_PLUGIN_DIR_NAME . '/languages/' ) );
					$file       = $first_part . SURECART_PLUGIN_DIR_NAME . '/languages/surecart-' . $locale . '.json';
				} else {
					$first_part = substr( $file, 0, strpos( $file, 'plugins/surecart-' ) );
					$file       = $first_part . 'plugins/surecart-' . $locale . '.json';
				}
			}

			if ( false === $file ) {
				$file = SURECART_LANGUAGE_DIR . '/surecart-' . $locale . '.json';
			}
		}
		return $file;
	}

	/**
	 * This is needed for Loco translate to work properly.
	 */
	public function loadPluginTextDomain() {
		// Default languages directory for SureCart.
		$lang_dir = trailingslashit( SURECART_LANGUAGE_DIR );

		/**
		 * Filters the languages directory path to use for SureCart.
		 *
		 * @param string $lang_dir The languages directory path.
		 */
		$lang_dir = apply_filters( 'surecart_languages_directory', $lang_dir );

		// Use determine_locale() which returns user locale in admin, site locale on frontend.
		// Allow plugins/themes to override via 'plugin_locale' filter.
		$locale = apply_filters( 'plugin_locale', determine_locale(), 'surecart' );
		$mofile = sprintf( '%1$s-%2$s.mo', 'surecart', $locale );

		// Setup paths to current locale file.
		$mofile_local  = $lang_dir . $mofile;
		$mofile_global = WP_LANG_DIR . '/plugins/' . $mofile;

		if ( file_exists( $mofile_global ) ) {
			// Look in global /wp-content/languages/plugins/ folder.
			load_textdomain( 'surecart', $mofile_global );
		} elseif ( file_exists( $mofile_local ) ) {
			// Look in local /wp-content/plugins/surecart/languages/ folder.
			load_textdomain( 'surecart', $mofile_local );
		} else {
			// Load the default language files.
			load_plugin_textdomain( 'surecart', false, $lang_dir );
		}
	}
}
