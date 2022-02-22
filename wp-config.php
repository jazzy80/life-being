<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'being_you_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'rootroot' );

/** MySQL hostname */
define( 'DB_HOST', 'mariadb:3306' );

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
define( 'AUTH_KEY',         '7K(t+*HUn+@ANxKc?r2Tctoig:~/>lNRLXRM1tEZ#YS/M1Kd>a+lh.sM/A0eYoZ)' );
define( 'SECURE_AUTH_KEY',  'U+|p.1CGKI-(|Qq]-jDSV4jZv=bGK!8TlM8HC5=v8BZqi,TNVw+L @dyo,5-Tl8p' );
define( 'LOGGED_IN_KEY',    '6;x1^W,H<(z <@Z4B9Bj0p-?_ mf<z}>u@zFW(}x0*i0:oi#+8+ZY8KJ.h.:%Z=s' );
define( 'NONCE_KEY',        '*l4t1,j)WrgEj_X=pJVzaSlKJ!)Rj1pA*!u_O274cSq=lX%SzW{(=cjs;U80U0R2' );
define( 'AUTH_SALT',        ' Q$&DUoZ;zGGW<jxcmkmH/A%HPtEzadlclcTGcB}ahW68)+Of[&GR?@J^&|o)X$x' );
define( 'SECURE_AUTH_SALT', 'AnH|AFXX93G+g:L!@W)KNbJ-)`hzt}|jY/@0CcH7l3oZph !jV*pX_K M@]Q[qJq' );
define( 'LOGGED_IN_SALT',   'W7%d1|*g&T^_LG#`o[vq8ePe*opk~WWM:(y+{r]K!{<5ju!5B>^jRyhE+YPj&WUS' );
define( 'NONCE_SALT',       ')k-y=2JEK4~vim-RznjJe:Un/CSB5qpr:c,`#`o-F!W+m|,4]c{;_#d@56BBs<(}' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

