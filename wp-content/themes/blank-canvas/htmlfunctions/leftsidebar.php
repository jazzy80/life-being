<?php
// Retrieve the pages that need a left sidebar.
function get_pages_needing_left_sidebar(): array {
	return array_filter(get_pages(), function(WP_Post $page): bool {
		return in_array(strtolower($page -> post_title), PAGES_WITH_SIDEBAR);
	});
}

/*
Retrieve the menus for the left sidebar if required.
*/
function get_left_side_bar_menu_items(array $menus) {
	// Get the menu_items. Filter on the menu item being a child of the page that needs them.
  return (sizeof($menus) > 0
		? array_filter(wp_get_nav_menu_items($menus[0]), function(WP_Post $item): bool {
	    return is_child_of($item, get_pages_needing_left_sidebar());
	  }) : []);
}

/*
Get the left_side_bar as HTML string.
*/
function get_left_side_bar(WP_Post $current_post): string {
	$left_sidebar_needing_pages = get_pages_needing_left_sidebar();
	$left_sidebar_needing_page_ids = get_id_from_pages($left_sidebar_needing_pages);

if (
		// If the current post is a page that needs a rendered left sidebar with a vitality menu.
		in_array($current_post -> ID, $left_sidebar_needing_page_ids) ||
		// or if its a child of the current page, the sidebar also needs to be rendered.
		is_child_of($current_post, $left_sidebar_needing_pages)
	) {
		return get_vitality_menu($current_post, $left_sidebar_needing_page_ids);
	}
	// Else return an empty left side bar without a menu.
	return get_standard_left_side_bar($current_post);
}

function get_standard_left_side_bar(WP_Post $current_post): string {
	$style = is_on_home($current_post) ? 'opacity: 0;' : '';
	return create_container_with_most_recent_articles(
		'most-recent-container',
		[
			get_most_recent_article(
				$most_recent_recipe,
				'Most recent recipe',
				'most-recent-recipe'
			),
			get_most_recent_article(
				$most_recent_exercise,
				'Most recent Exercise',
				'most-recent-exercise'
			),
			get_most_recent_article(
				$most_recent_general,
				'Most Recent article',
				'most-recent-article'
			)
		],
		$style
	);
}

/*
Get the vitality left side bar menu HTML string.
*/
function get_vitality_menu(WP_Post $current_post, array $left_sidebar_needing_page_ids): string {
	// Use menu items defined for this post.
	$menus = wp_get_nav_menus();
	// Retrieve all left side bar menu_items from all defined menus.
	$menu_items = get_left_side_bar_menu_items($menus);

	// Retrurn the left side bar as a HTML string.
	return
	'<div class="sidebar">
	 <h5 class="sidebar-title"> Vitality </h5>
		<ul>' .
	// If on a child page of a sidebar page.
  // create a backlink back to its parent.
	(in_array($current_post -> post_parent, $left_sidebar_needing_page_ids)
		? '<span class="sidebar-back-link">
		 	 <i class="fas fa-angle-double-left"></i>
			 <li>
			 	<a href="' . filter_var(get_permalink($current_post -> post_parent), FILTER_SANITIZE_URL) . '">
					Terug
				</a>
			</li>
			</span>'
		: '') .
	// Create all the menu items, and concatenate to html string.
  // Use links of child pages to populate the sidebar.
	array_reduce($menu_items, function(string $html, WP_Post $menu_item): string {
		return $html .
		'<li>
			<object class="heart-icon" data="/resources/hearticon.svg"></object>
			 <a href="' . filter_var($menu_item -> url, FILTER_SANITIZE_URL) . '">' .
					filter_var($menu_item -> title, FILTER_SANITIZE_STRING) .
	 		'</a>
		</li>';
	}, '') .
	'</ul>
	</div>';
}
?>
