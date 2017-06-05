<?php
/**
 * Plugin Name: <%= pluginName %>
 * Plugin URI: <%= projectHome %>
 * Description: <%= description %>
 * Version: 1.0
 * Text Domain: <%= textDomain %>
 * Domain Path: /lang
 * Author: <%= authorName %>
 * Author URI: <%= authorUrl %>
 * License: GPLv2
 *
 * @package <%= packageName %>
 */

define( '<%= pluginConst %>_VERSION', '1.0' );
define( '<%= pluginConst %>_URL', plugin_dir_url( __FILE__ ) );

add_action( 'plugins_loaded', '<%= pluginSlug %>_loader' );

/**
 * Load plugin functionality.
 */
function <%= pluginSlug %>_loader() {

	// Remember the text domain.
	load_plugin_textdomain( '<%= textDomain %>', false, dirname( dirname( __FILE__ ) ) . '/lang' );

}
