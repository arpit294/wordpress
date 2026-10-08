<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'amarkot' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'i40x!QJm9<GaV;[S|C69x{6;6ah>j71pwM{}m>.VSA1Pv{2V,mS6%e+5e3)H2a*K' );
define( 'SECURE_AUTH_KEY',  '1Q)1!Lr4&rsZ?UdO[;^}P.clpRA1WgE/>5Z~ntP$.YG>s/hG<FkA&y:Uv3/?3&U|' );
define( 'LOGGED_IN_KEY',    'I|>[8h/yAnZwUfT:q~@=+YsmowVYF1I{Tqzk%)JA$$?*f zs|%V+EkFkOuFY$oQ&' );
define( 'NONCE_KEY',        '>wo**_gl5:ao[S4e/=I,=c|2H.ffl7$S[&FOF*;:cB@.*N;W|mZw]3p4%zip2KZW' );
define( 'AUTH_SALT',        'z?2t.#:CfX&R*B7N.r39!Pk[WEf+6!@5YehL9[)W7M48Ol/^Y*5L|wGXhg0]* -M' );
define( 'SECURE_AUTH_SALT', '!:3k95VXs6G:$zPOyMuY93Z)3N=ejG3K-Fn<CIgs7g5-2cCSp]RYvS]&0n]WJaoZ' );
define( 'LOGGED_IN_SALT',   '7>+;E^;DGz/Y|zlvo>ht ]SF:k>a`T`x.)@x8rgiR~GF150K$;jl(F^~F51gph|8' );
define( 'NONCE_SALT',       '[FJSZq~:OlL6wYqh`K|cb3lB~?C@6PZb>AeH)5DT_C{/}=:|!Z(_@?s0wN V##Y{' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define( 'WP_MEMORY_LIMIT', '512M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );

define( 'SURECART_ENCRYPTION_KEY', 'I|>[8h/yAnZwUfT:q~@=+YsmowVYF1I{Tqzk%)JA$$?*f zs|%V+EkFkOuFY$oQ&' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';