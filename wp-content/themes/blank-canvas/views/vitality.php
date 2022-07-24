<?php
/*
Retrieve the menus for the left sidebar if required.
*/
function get_vitality_menu_items(array $menus): array {
	// Get the menu_items. Filter on the menu item being a child of the page that needs them.
  return (sizeof($menus) > 0
		? array_filter(wp_get_nav_menu_items($menus[0]), function(WP_Post $item): bool {
	    return is_child_of($item, get_pages_needing_vitality());
	  }) : []);
}

function get_pages_needing_vitality(): array {
	return MaybeCompanion::flattenArray(
    array_map(
  		'get_page_from_title',
      PAGES_NEEDING_VITALITY
  	)
  );
}

function is_page_needing_vitality(WP_Post $current_post): bool {
  $pages = get_pages_needing_vitality();
  return in_array($current_post, $pages)
    || is_child_of($current_post, $pages);
}

/*
Get the vitality left side bar menu HTML string.
*/
function render_vitality_menu(WP_Post $current_post): string {
	// Use menu items defined for this post.
	$menus = wp_get_nav_menus();
	// Retrieve all left side bar menu_items from all defined menus.
	$menu_items = get_vitality_menu_items($menus);

	// Retrurn the left side bar as a HTML string.
	return
	'<div class="sidebar">
	 <h5 class="sidebar-title"> Vitality </h5>
		<ul>' .
	// If on a child page of a sidebar page.
  // create a backlink back to its parent.
	(is_child_of($current_post, get_pages_needing_vitality())
	? create_backlink_to_parent($current_post) : '') .
	// Concantenate with the rest of the menu items below.
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

function create_backlink_to_parent(WP_Post $current_post): string {
	return '<span class="sidebar-back-link">
	 	 <i class="fas fa-angle-double-left"></i>
		 <li>
		 	<a href="' . filter_var(get_permalink($current_post -> post_parent), FILTER_SANITIZE_URL) . '">
				Terug
			</a>
		</li>
		</span>';
}
?>
