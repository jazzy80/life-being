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

 //applicationConfig
require_once __DIR__ . '/applicationconfig.php';
 // adding a rest api for retrieving all blogs.
require_once __DIR__ . '/api/blogs.php';
require_once __DIR__ . '/api/poetry.php';

//get the data objects.
require_once __DIR__ . '/data/guestbookentry.php';

// get the models.
require_once __DIR__ . '/models/guestbookmodel.php';
// adding the html string generation functions for the leftsidebar.
require_once __DIR__ . '/htmlfunctions/vitality.php';
require_once __DIR__ . '/htmlfunctions/mostrecentarticle.php';
require_once __DIR__ . '/htmlfunctions/guestbook.php';

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
 * Block Patterns.
 */
require get_stylesheet_directory() . '/inc/block-patterns.php';

/**
 * Customizer additions.
 */
require get_stylesheet_directory() . '/inc/customizer.php';

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
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

// Check if a page is a child of one of the parents.
function is_child_of(WP_Post $child, array $parents): bool {
	foreach($parents as $parent)  {
		if ($child -> post_parent === $parent -> ID) return true;
	}
	return false;
}

//find_if, use a predicate to retrieve an element from an array or null if not found.
function find_if(array $array, callable $predicate): WP_Post {
	foreach($array as $element) {
		if ($predicate($element)) return $element;
	}
	return null;
}

/*
Using a title, find the corresponding page having that title or `null` if not found.
*/
function get_page_from_title(string $title): WP_Post {
	return find_if(get_pages(), function(WP_Post $page) use($title) {
		return strtolower($page -> post_title) === strtolower($title);
	});
}

/*
Retrieve all child page of `parent`.
Return an array of child page objects sorted by date, descending order.
*/
function find_child_pages_of_parent(WP_Post $parent): array {
	return get_pages(
		array(
			'parent' => $parent -> ID,
			'sort_order' => 'DESC',
			'sort_column' => 'post_date'
		)
	);
}
/*
Find the most recent child from a parent.
*/
function find_most_recent_article(WP_Post $parent): ?WP_Post {
	$child_pages = find_child_pages_of_parent($parent);
	return (sizeof($child_pages) > 0) ? $child_pages[0] : null;
}

// map an array with `pages` to an array with the page ids.
function get_id_from_pages(array $pages): array {
	return array_map(function($page) {
		return $page -> ID;
	}, $pages);
}

function is_on_home(WP_Post $current_post): bool {
	return strtolower($current_post -> post_title) === strtolower(HOME_PAGE);
}

function page_needs_left_sidebar(WP_Post $current_post): bool {
  return in_array(strtolower($current_post -> post_title), PAGES_NEEDING_LEFT_SIDEBAR);
}

function page_needs_right_sidebar(WP_Post $current_post): bool {
  return in_array(strtolower($current_post -> post_title), PAGES_NEEDING_RIGHT_SIDEBAR);
}

function page_needs_vitality_menu(WP_Post $current_post): bool {
  return in_array(
    strtolower($current_post -> post_title), PAGES_NEEDING_VITALITY
    ) || is_child_of($current_post, array_map('get_page_from_title', PAGES_NEEDING_VITALITY));
}

function get_guestbook_entries(): array {
  global $wpdb;
  $con = new GuestBookModel($wpdb);
  return $con -> get_all_entries();
}

add_filter( 'body_class', 'blank_canvas_body_classes' );
// Adding excerpt support in the wp-admin.
add_post_type_support( 'page', 'excerpt' );
add_filter( 'big_image_size_threshold', '__return_false' );
