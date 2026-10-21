<?php
/**
 * Register Abilities
 *
 * Loads and registers all Modern Cart abilities.
 *
 * @package modern-cart
 */

namespace ModernCart\Inc\Abilities;

use ModernCart\Inc\Traits\Get_Instance;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Register_Abilities
 */
class Register_Abilities {

	use Get_Instance;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_abilities_api_categories_init', array( $this, 'register_category' ), 10 );
		add_action( 'wp_abilities_api_init', array( $this, 'register_abilities' ), 10 );
	}

	/**
	 * Register the Modern Cart ability category.
	 *
	 * @return void
	 */
	public function register_category() {
		if ( ! function_exists( 'wp_register_ability_category' ) ) {
			return;
		}

		wp_register_ability_category(
			'moderncart',
			array(
				'label'       => __( 'Modern Cart', 'modern-cart' ),
				'description' => __( 'Abilities for managing Modern Cart settings and configuration.', 'modern-cart' ),
			)
		);
	}

	/**
	 * Register all Modern Cart abilities.
	 *
	 * @return void
	 */
	public function register_abilities() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}

		$abilities = array(
			'get-settings'          => array(
				'file'  => 'settings/get-settings.php',
				'class' => 'ModernCart\Inc\Abilities\Settings\Get_Settings',
			),
			'update-settings'       => array(
				'file'  => 'settings/set-settings.php',
				'class' => 'ModernCart\Inc\Abilities\Settings\Set_Settings',
			),
			'get-available-options' => array(
				'file'  => 'settings/get-available-options.php',
				'class' => 'ModernCart\Inc\Abilities\Settings\Get_Available_Options',
			),
			'reset-settings'        => array(
				'file'  => 'settings/reset-settings.php',
				'class' => 'ModernCart\Inc\Abilities\Settings\Reset_Settings',
			),
			'get-plugin-status'     => array(
				'file'  => 'plugin/get-plugin-status.php',
				'class' => 'ModernCart\Inc\Abilities\Plugin\Get_Plugin_Status',
			),
			'complete-onboarding'   => array(
				'file'  => 'plugin/complete-onboarding.php',
				'class' => 'ModernCart\Inc\Abilities\Plugin\Complete_Onboarding',
			),
			'get-cart-summary'      => array(
				'file'  => 'cart/get-cart-summary.php',
				'class' => 'ModernCart\Inc\Abilities\Cart\Get_Cart_Summary',
			),
		);

		/**
		 * Filter the list of abilities to register.
		 *
		 * Allows the Pro plugin (modern-cart-woo) and other extensions
		 * to register additional abilities.
		 *
		 * Each entry must be an array with:
		 *   'file'  => (string) Optional. Path to the ability class file. An absolute path
		 *                       is used as-is; a relative one resolves against this
		 *                       directory. Omit it when the class is autoloadable — note
		 *                       that this plugin's autoloader only handles the ModernCart
		 *                       namespace, so an extension must either pass 'file' or
		 *                       register its own.
		 *   'class' => (string) Fully-qualified class name of the ability.
		 *
		 * Example (in modern-cart-woo):
		 *   add_filter( 'moderncart_abilities', function( $abilities ) {
		 *       $abilities['get-pro-settings'] = array(
		 *           'file'  => MODERNCART_PRO_DIR . 'inc/abilities/settings/get-pro-settings.php',
		 *           'class' => 'ModernCartPro\Inc\Abilities\Settings\Get_Pro_Settings',
		 *       );
		 *       return $abilities;
		 *   } );
		 *
		 * @since 1.0.7
		 * @param array $abilities Array of ability entries.
		 */
		$abilities = apply_filters( 'moderncart_abilities', $abilities );

		/**
		 * Trusted namespaces for ability classes.
		 * Only classes rooted in these namespaces may be registered.
		 * This prevents arbitrary class instantiation via the filter.
		 *
		 * @var array<string>
		 */
		$trusted_namespaces = array(
			'ModernCart\\Inc\\Abilities\\',
			'ModernCartPro\\Inc\\Abilities\\',
		);

		foreach ( $abilities as $ability_data ) {
			if ( empty( $ability_data['class'] ) ) {
				continue;
			}

			$class      = $ability_data['class'];
			$is_trusted = false;

			foreach ( $trusted_namespaces as $ns ) {
				if ( 0 === strpos( $class, $ns ) ) {
					$is_trusted = true;
					break;
				}
			}

			if ( ! $is_trusted ) {
				continue;
			}

			// Load the declared file when the class is not already autoloadable. Only
			// reached for a class in a trusted namespace, and only when that class is
			// still undefined, so this cannot be used to include an arbitrary file.
			if ( ! class_exists( $class ) && ! empty( $ability_data['file'] ) && is_string( $ability_data['file'] ) ) {
				$ability_file = path_is_absolute( $ability_data['file'] )
					? $ability_data['file']
					: __DIR__ . '/' . ltrim( $ability_data['file'], '/' );

				if ( is_readable( $ability_file ) ) {
					require_once $ability_file;
				}
			}

			if ( ! class_exists( $class ) ) {
				continue;
			}

			$ability = new $class();

			if ( ! ( $ability instanceof Abstract_Ability ) ) {
				continue;
			}

			// Normalize the ID to a lowercase, non-falsy string as required by wp_register_ability().
			$ability_id = strtolower( (string) $ability->get_id() );

			if ( ! $ability_id ) {
				continue;
			}

			$ability_args = array(
				'label'               => $ability->get_label(),
				'description'         => $ability->get_description(),
				'category'            => $ability->get_category(),
				'input_schema'        => $ability->get_final_input_schema(),
				'execute_callback'    => array( $ability, 'handle_execute' ),
				'permission_callback' => array( $ability, 'check_permission' ),
				'meta'                => array(
					'annotations'  => $ability->get_annotations(),
					'instructions' => $ability->get_instructions(),
					'show_in_rest' => true,
					'mcp'          => array(
						'public' => true,
						'type'   => 'tool',
					),
				),
			);

			wp_register_ability( $ability_id, $ability_args );
		}
	}
}
