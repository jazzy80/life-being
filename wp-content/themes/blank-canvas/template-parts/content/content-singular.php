<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */

 //Define which pages should get a sidebar.
define('PAGES_WITH_SIDEBAR', ['life being inspirations']);
define('PAGES_WITH_MOST_RECENT_BAR', ['home']);
// Define the blogs parent page title.
define('BLOG_PAGE', 'being blogs');
define('POETRY_PAGE', 'poetry');

// Check if a page is a child of one of the parents.
function is_child_of($child, $parents) {
	foreach($parents as $parent)  {
		if ($child -> post_parent === $parent -> ID) return true;
	}
	return false;
}

//find_if, use a predicate to retrieve an element from an array or null if not found.
function find_if($array, $predicate) {
	foreach($array as $element) {
		if ($predicate($element)) return $element;
	}
	return null;
}

function get_page_from_title($title) {
	return find_if(get_pages(), function($page) use($title) {
		return strtolower($page -> post_title) === strtolower($title);
	});
}

function find_most_recent_article($parent) {
	$child_pages = get_pages(
		array(
			'parent' => $parent -> ID,
			'sort_order' => 'DESC',
			'sort_column' => 'post_date'
		)
	);
	if (sizeof($child_pages) > 0) return $child_pages[0];
	return null;
}

$show_post_and_page_titles = get_theme_mod( 'show_post_and_page_titles', false );
// Get the current post/page
$current_post = get_post();

// Retrieve the pages that need a sidebar
$pages_with_sidebar = array_filter(get_pages(), function($page) {
	return in_array(strtolower($page -> post_title), PAGES_WITH_SIDEBAR);
});
// Retrieve its ID, set to null if it does not require a sidebar.
$sidebar_page_ids = array_map(function($page) {
	return $page -> ID;
}, $pages_with_sidebar);
// if current page is a sidebar page, or a child of a sidebar page, render the sidebar.
if (
		in_array($current_post -> ID, $sidebar_page_ids) ||
		// if its a child of the current page, the sidebar also needs to be rendered.
		is_child_of($current_post, $pages_with_sidebar)
	) {
	// Use menu items defined for life being inspirations submenu
	$menus = wp_get_nav_menus();
	// Get the menus, filter on life being inspirations submenu items
  $menu_items = sizeof($menus) > 0
		? array_filter(wp_get_nav_menu_items($menus[0]), function($item) use ($pages_with_sidebar) {
	    return is_child_of($item, $pages_with_sidebar);
	  }) : [];
	// Use links of child pages to auto populare the sidebar.
	$output = '<div class="sidebar">
		<h5 class="sidebar-title">Vitality</h5>
		<ul>';

	// If on a child page of a sidebar page.
	if (in_array($current_post -> post_parent, $sidebar_page_ids)) {
		$output .= '<span class="sidebar-back-link">';
		$output .= '<i class="fas fa-angle-double-left"></i>';
		// create a backlink if on childpage of lif-being-inspirations
		$output .= '<li><a href="'. get_permalink($current_post -> post_parent) . '">' .  'Terug' . '</a></li>';
		$output .= '</span>';
	}

	// Create all the menu items.
	foreach ($menu_items as $item) {
		$output .= '<li><a href="' . $item -> url . '">' . $item -> title . '</a></li>';
	}
	// Close off the container.
	$output .= '</div>';
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
<?php
if (in_array(strtolower($current_post -> post_title), PAGES_WITH_MOST_RECENT_BAR)) {
	// Retrieve the blog page.
	$most_recent_blog = find_most_recent_article(get_page_from_title(BLOG_PAGE));
	$most_recent_poem = find_most_recent_article(get_page_from_title(POETRY_PAGE));
	if ($most_recent_blog && $most_recent_poem) {
			$output =
			'<div class="right-side-container">
				<div class="most-recent-blog">
					<p class="recent-blog-heading">Meest recent Blog</p>
					<img src="/gallery/background photo/beukenlaan.jpg" width="50px" height="50px" />
					<p>' . $most_recent_blog -> post_title . '
					<a class="right-side-title" href="' . get_permalink($recent_blog) . '">
						<p>Lees Blog</p>
					</a>
				</div>
				<div class="inspire-block">
					<p> Inspire </p>
					<img src="/gallery/background photo/herfstboom.lichtvlek.jpg" width="50px" height="50px" />
				</div>
				<div class="recent-poem">
					<p>Meest recent gedicht</p>
					<img src="/gallery/background photo/herfstboom.lichtvlek.jpg" width="50px" heigth="50px" />
					<p class="right-side-title">' . $most_recent_poem -> post_title . '</p>
					<a href="' . get_permalink($most_recent_poem) . '">
						<p>Lees Gedicht</p>
					</a>
				</div>
		</div>';
		echo $output;
	}
}
?>

<script src="/scripts/dist/app.js"></script>
