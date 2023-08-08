<?php

/**
 * Blank Canvas functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Blank Canvas
 * @since 1.0
 */

use Api\Article;
use Api\Gallery;
use Api\Guestbook;
use Data\GuestBook\GuestBookRepository;
use Data\Page\PageRepository;

//Add the configuration for the application.
require_once __DIR__ . '/applicationconfig.php';

// Register all rest api endpoints.
function add_rest_endpoints(): void {
	add_action( 'rest_api_init', function () {
		register_rest_route( 'api', '/articles/', array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ new Article( new PageRepository() ), 'get_articles' ],
			'permission_callback' => '__return_true',
		) );

		register_rest_route( 'api', '/gallery-images/', array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => [ new Gallery( new PageRepository() ), 'get_gallery_images' ],
			'permission_callback' => '__return_true',
		) );

		global $wpdb;
		register_rest_route( 'api', '/guestbook/', array(
			'methods'  => WP_REST_Server::CREATABLE,
			'callback' => [ new Guestbook( new GuestBookRepository($wpdb) ), 'create_guestbook_entry' ],
			'permission_callback' => '__return_true',
		) );
	} );
}

add_rest_endpoints();
if ( ! function_exists( 'blank_canvas_setup' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function blank_canvas_setup() {

		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

		// Enqueue editor styles.
		add_editor_style( 'variables.css' );

		// Editor color palette.
		$colors_theme_mod = get_theme_mod( 'custom_colors_active' );
		$primary          = ( ! empty( $colors_theme_mod ) && 'default' === $colors_theme_mod || empty( get_theme_mod( 'seedlet_--global--color-primary' ) ) ) ? '#000000' : get_theme_mod( 'seedlet_--global--color-primary' );
		$secondary        = ( ! empty( $colors_theme_mod ) && 'default' === $colors_theme_mod || empty( get_theme_mod( 'seedlet_--global--color-secondary' ) ) ) ? '#007cba' : get_theme_mod( 'seedlet_--global--color-secondary' );
		$foreground       = ( ! empty( $colors_theme_mod ) && 'default' === $colors_theme_mod || empty( get_theme_mod( 'seedlet_--global--color-foreground' ) ) ) ? '#333333' : get_theme_mod( 'seedlet_--global--color-foreground' );
		$tertiary         = ( ! empty( $colors_theme_mod ) && 'default' === $colors_theme_mod || empty( get_theme_mod( 'seedlet_--global--color-tertiary' ) ) ) ? '#FAFAFA' : get_theme_mod( 'seedlet_--global--color-tertiary' );
		$background       = ( ! empty( $colors_theme_mod ) && 'default' === $colors_theme_mod || empty( get_theme_mod( 'seedlet_--global--color-background' ) ) ) ? '#FFFFFF' : get_theme_mod( 'seedlet_--global--color-background' );

		add_theme_support(
			'editor-color-palette',
			array(
				array(
					'name'  => __( 'Primary', 'blank-canvas' ),
					'slug'  => 'primary',
					'color' => $primary,
				),
				array(
					'name'  => __( 'Secondary', 'blank-canvas' ),
					'slug'  => 'secondary',
					'color' => $secondary,
				),
				array(
					'name'  => __( 'Foreground', 'blank-canvas' ),
					'slug'  => 'foreground',
					'color' => $foreground,
				),
				array(
					'name'  => __( 'Tertiary', 'blank-canvas' ),
					'slug'  => 'tertiary',
					'color' => $tertiary,
				),
				array(
					'name'  => __( 'Background', 'blank-canvas' ),
					'slug'  => 'background',
					'color' => $background,
				),
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'blank_canvas_setup', 11 );

/**
 * Filter the colors for Blank Canvas
 */
function blank_canvas_colors() {
	return array(
		array( '--global--color-background', '#FFFFFF', __( 'Background Color', 'blank-canvas' ) ),
		array( '--global--color-foreground', '#333333', __( 'Foreground Color', 'blank-canvas' ) ),
		array( '--global--color-primary', '#000000', __( 'Primary Color', 'blank-canvas' ) ),
		array( '--global--color-secondary', '#007cba', __( 'Secondary Color', 'blank-canvas' ) ),
		array( '--global--color-tertiary', '#FAFAFA', __( 'Tertiary Color', 'blank-canvas' ) ),
	);
}

add_filter( 'seedlet_colors', 'blank_canvas_colors' );

/**
 * Remove Seedlet theme features.
 */
function blank_canvas_remove_parent_theme_features() {
	// Theme Support.
	remove_theme_support( 'custom-header' );
	remove_theme_support( 'customize-selective-refresh-widgets' );
}

add_action( 'after_setup_theme', 'blank_canvas_remove_parent_theme_features', 11 );

/**
 * Dequeue Seedlet scripts.
 */
function blank_canvas_dequeue_parent_scripts() {
	if ( false === get_theme_mod( 'show_site_header', false ) ) {
		// Naviation assets.
		wp_dequeue_script( 'seedlet-primary-navigation-script' );
		wp_dequeue_style( 'seedlet-style-navigation' );
	}
}

add_action( 'wp_enqueue_scripts', 'blank_canvas_dequeue_parent_scripts', 11 );

/**
 * Remove unused custmizer settings.
 */
function blank_canvas_remove_customizer_settings( $wp_customize ) {

	// Remove Jetpack's Author Bio setting.
	if ( function_exists( 'jetpack_author_bio' ) ) {
		$wp_customize->remove_control( 'jetpack_content_author_bio_title' );
		$wp_customize->remove_control( 'jetpack_content_author_bio' );
	}

	// Remove Seedlet's header and footer hide options,
	// since they're already hidden by default.
	$wp_customize->remove_control( 'hide_site_header' );
	$wp_customize->remove_control( 'hide_site_footer' );
}

add_action( 'customize_register', 'blank_canvas_remove_customizer_settings', 11 );

/**
 * Add custmizer settings.
 */
function blank_canvas_add_customizer_settings( $wp_customize ) {

	// Cast the widgets panel as an object.
	$customizer_widgets_panel = (object) $wp_customize->get_panel( 'widgets' );

	// Add a Customizer message about the site title & tagline options.
	$wp_customize->get_section( 'title_tagline' )->description  = __( 'The site logo, title, and tagline will only appear on single posts and pages if the “Site header and top menu" option is enabled in the Content Options section.', 'blank-canvas' );
	$wp_customize->get_section( 'menu_locations' )->description = __( 'This theme will only display Menus if they are enabled in the Content Options section.', 'blank-canvas' );
	$wp_customize->get_panel( 'nav_menus' )->description        = __( 'This theme will only display Menus if they are enabled in the Content Options section.', 'blank-canvas' );
	$customizer_widgets_panel->description                      = __( 'This theme will only display Widgets if they are enabled in the Content Options section.', 'blank-canvas' );
}

add_action( 'customize_register', 'blank_canvas_add_customizer_settings', 11 );

/**
 * Remove Meta Footer Items.
 */
if ( ! function_exists( 'seedlet_entry_meta_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function seedlet_entry_meta_footer() {

		// Edit post link.
		edit_post_link(
			sprintf(
				wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers. */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'blank-canvas' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">' . seedlet_get_icon_svg( 'edit', 16 ),
			'</span>'
		);
	}
endif;

/**
 * Enqueue scripts and styles.
 */
function blank_canvas_enqueue() {
	wp_enqueue_style( 'blank-canvas-styles', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'blank_canvas_enqueue', 11 );

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 *
 * @return array
 */
function blank_canvas_body_classes( $classes ) {

	if ( false === get_theme_mod( 'show_post_and_page_titles', false ) ) {
		$classes[] = 'hide-post-and-page-titles';
	}

	if ( false === get_theme_mod( 'show_site_footer', false ) ) {
		$classes[] = 'hide-site-footer';
	}

	if ( false === get_theme_mod( 'show_comments', false ) ) {
		$classes[] = 'hide-comments';
	}

	return $classes;
}

add_filter( 'body_class', 'blank_canvas_body_classes' );

// Adding excerpt support in the wp-admin.
add_post_type_support( 'page', 'excerpt' );

// Remove big image size threshold.
add_filter( 'big_image_size_threshold', '__return_false' );

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class ProductListTable extends WP_List_Table {
	function prepare_items() {
		$columns               = $this->get_columns();
		$hidden                = array();
		$sortable              = array();
		$this->_column_headers = array( $columns, $hidden, $sortable );
		$this->items           = $this->get_data();
	}

	function get_columns() {
		$columns = array(
			'id'          => 'Nummer',
			'name'        => 'Naam',
			'description' => 'Beschrijving',
			'category'    => 'Categorie',
			'image'       => 'Image',
			'price'       => 'Prijs'
		);

		return $columns;
	}

	function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case 'id':
			case 'name':
			case 'description':
			case 'price':
			case "image":
			case "category":
				return $item[ $column_name ];
			default:
				return print_r( $item, true ); //Show the whole array for troubleshooting purposes
		}
	}

	private function get_data() {
		return array(
			array(
				"id"          => 1,
				"name"        => "schilderij",
				"price"       => "15.25",
				"category"    => "Nature art",
				"image"       => "/upload/mooi-schilderij",
				"description" => "Mooi schilderij"
			)
		);
	}

	private function search( array $arr, callable $pred ) {
		foreach ( $arr as $el ) {
			if ( $pred( $el ) ) {
				return $el;
			}
		}

		return null;
	}

	function get_by_id( $id ) {
		$items = $this->get_data();

		return $this->search( $items, fn( $product ) => $product['id'] === $id );
	}

	function column_name( $item ) {
		$actions = array(
			'edit' => sprintf( '<a href="?page=%s&action=%s&product=%s">Edit</a>', $_REQUEST['page'], 'edit_product', $item['id'] ),
		);

		return sprintf( '%1$s %2$s', $item['name'], $this->row_actions( $actions ) );
	}
}

function add_products_menu_item() {
	add_menu_page( 'Producten', 'Producten', 'activate_plugins', 'producten', 'render_products_admin_page', null, 3 );
}

add_action( 'admin_menu', 'add_products_menu_item' );

function render_products_admin_page() {
	$products_table = new ProductListTable();
	echo '<div class="wrap"><h2>Producten</h2>';
	if ( $_GET['action'] == "edit_product" ) {
		$product = $products_table->get_by_id( 1 );
		[ 'name' => $name, 'description' => $description, 'price' => $price ] = $product;
		echo <<< EOL
		<form style="display: flex; flex-direction: column; width: 20%;" action="/Api/wp-json" method="post">
		<label for="name">Naam: </label>
		<input id="name" name="name" value="$name">
		<label for="description">Bescrijving: </label>
		<input id="description" name="description" value="$description">
		<label for="image_url">Image url: </label>
		<input id="image_url" name="image_url">
		<label for="category">Categorie: </label>
		<input id="category" name="category">
		<label for="price">Prijs: </label>
		<input id="price" name="price" value="$price">
		<input type="submit">
		</form>
		EOL;
	} else {
		$products_table->prepare_items();
		$products_table->display();
	}
	echo '</div>';
}
