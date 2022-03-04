<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */

define('LIFE_BEING_INSPR_TITLE', 'life being inspirations');

// Could not find a standard function that could find a value based on a predicate
// Beneath a simple implementation of such a function
function find_if($arr, callable $p) {
	foreach ($arr as $value) {
		if ($p($value) === true) return $value;
	}
	return null;
};

function is_child_of($child, $parent) {
	if ($child === null) return false;
	return $child -> post_parent === $parent -> ID;
}


$show_post_and_page_titles = get_theme_mod( 'show_post_and_page_titles', false );
// Get the current post/page
$current_post = get_post();
// life being inspirations is special, since it requires a sidebar
// Retrieve its ID
$life_being_insp_page= find_if(get_pages(), function($page) {
	return strtolower($page -> post_title) === LIFE_BEING_INSPR_TITLE;
});
$life_being_insp_id = $life_being_insp_page ? $life_being_insp_page -> ID : null;
// If current page is the life being inspirations page or a child of that page
if (
		$current_post -> ID === $life_being_insp_id ||
		is_child_of($current_post, $life_being_insp_page)
	) {
	// Use menu items defined for life being inspirations submenu
	$menus = wp_get_nav_menus();
	$menu_items = [];
	// If there are menus defined
	if (sizeof($menus) > 0) {
		// Get the menus, filter on life being inspirations submenu items
	  $menu_items = array_filter(wp_get_nav_menu_items($menus[0]), function($item) use ($life_being_insp_page) {
	    return is_child_of($item, $life_being_insp_page);
	  });
	}
	// Use links of child pages to auto populare the sidebar.
	$output = '<div class="sidebar">
		<h5 class="sidebar-title">Vitality</h5>
		<ul>';
	// create a backlink if on childpage of lif-being-inspirations
	if ($current_post -> post_parent === $life_being_insp_id) {
		$output .= '<span class="sidebar-back-link">';
		$output .= '<i class="fas fa-angle-double-left"></i>';
		$output .= '<li><a href="'. get_permalink($life_being_insp_page) . '">' .  'Terug' . '</a></li>';
		$output .= '</span>';
	}
	foreach ($menu_items as $item) {
		$output .= '<li><a href="' . $item -> url . '">' . $item -> title . '</a></li>';
	}
		$output .= '</ul></div>';
		echo $output;
}
?>
<div class="entry-content">
	<?php
	the_content(
		sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'blank-canvas' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			get_the_title()
		)
	);

	wp_link_pages(
		array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'blank-canvas' ),
			'after'  => '</div>',
		)
	);
	?>
</div><!-- .entry-content -->

<script src="/scripts/dist/app.js"></script>
