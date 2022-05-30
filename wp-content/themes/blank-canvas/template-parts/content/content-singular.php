<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */

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

$output = '<div class="sidebar">';
if (
		in_array($current_post -> ID, $sidebar_page_ids) ||
		// if its a child of the current page, the sidebar also needs to be rendered.
		is_child_of($current_post, $pages_with_sidebar)
	) {
	$output .= '<ul><h5 class="sidebar-title">Vitality</h5>';
	// Use menu items defined for life being inspirations submenu
	$menus = wp_get_nav_menus();
	// Get the menus, filter on life being inspirations submenu items
  $menu_items = sizeof($menus) > 0
		? array_filter(wp_get_nav_menu_items($menus[0]), function($item) use ($pages_with_sidebar) {
	    return is_child_of($item, $pages_with_sidebar);
	  }) : [];

	// If on a child page of a sidebar page.
	if (in_array($current_post -> post_parent, $sidebar_page_ids)) {
		$output .= '<span class="sidebar-back-link">';
		$output .= '<i class="fas fa-angle-double-left"></i>';
		// create a backlink if on childpage of lif-being-inspirations
		$output .= '<li>' .
			'<a href="'. filter_var(get_permalink($current_post -> post_parent), FILTER_SANITIZE_URL) . '">' .
				'Terug' .
			'</a>' .
		'</li>';
		$output .= '</span>';
	}

	// Create all the menu items.
 // Use links of child pages to auto populate the sidebar.
	foreach ($menu_items as $item) {
		$output .= '<li>
		<object class="heart-icon" data="/resources/hearticon.svg"></object>
		<a href="' . filter_var($item -> url, FILTER_SANITIZE_URL) . '">' .
			filter_var($item -> title, FILTER_SANITIZE_STRING) .
	 '</a>' .
 '</li>';
	}
	$output .= '</ul>';
}

// Close off the container.
$output .= '</div>';
echo $output;
?>
<div class="entry-content">
	<?php
	//  Init script to generate the blog list and the pagination.
	if ($current_post -> post_title === BLOG_PAGE) {
		echo '<script src="/scripts/dist/blogs.js"></script>';
	}
	// Otherwise show the page/post using default WP/theme functionality.
	else {
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
	}
	?>
</div><!-- .entry-content -->
<?php
//  Generate the right sidebar for pages eligable.
$output = '<div class="right-side-container">';
// Check if the current page should have a rigth sidebar.
if (in_array(strtolower($current_post -> post_title), PAGES_WITH_MOST_RECENT_BAR)) {
	// Retrieve the most recent blog and poem.
	$most_recent_blog = find_most_recent_article(get_page_from_title(BLOG_PAGE));
	$most_recent_poem = find_most_recent_article(get_page_from_title(POETRY_PAGE));
	if ($most_recent_blog && $most_recent_poem) {
			$output .=
				'<div class="most-recent-blog">
					<p class="recent-blog-heading">Meest recente Blog</p>' .
					'<img src="' . filter_var(get_the_post_thumbnail_url($most_recent_blog -> ID), FILTER_SANITIZE_URL) . '"' .
					'<p>' . filter_var($most_recent_blog -> post_title, FILTER_SANITIZE_STRING) . '</p>' .
					'<a href="' . filter_var(get_permalink($most_recent_blog), FILTER_SANITIZE_URL) . '">
						Lees Blog
					</a>
				</div>
				<div class="inspire-block">
					<p> Inspire </p>
					<img src="/gallery/background photo/herfstboom.lichtvlek.jpg"/>
					<p> Inspire </p>
					<a href="#">Ga naar inspire</a>
				</div>
				<div class="recent-poem">
					<p>Meest recente gedicht</p>
					<img src="' . filter_var(get_the_post_thumbnail_url($most_recent_poem -> ID), FILTER_SANITIZE_URL) . '"' .
					'<p class="right-side-title">' . filter_var($most_recent_poem -> post_title, FILTER_SANITIZE_STRING) . '</p>
					 <a href="' . filter_var(get_permalink($most_recent_poem), FILTER_SANITIZE_URL) . '">
						Lees Gedicht
					</a>
				</div>
		</div>';
	}
}
$output .= '</div>';
echo $output;
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
