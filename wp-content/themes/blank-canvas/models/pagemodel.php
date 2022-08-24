<?php
class PageModel {
  // Map an array of titles to an array of `WP_Post` objects.
  // Removes the ones that cannot be found.
  public function get_pages_from_titles(array $titles): array {
  	return MaybeCompanion::flattenArray(
      array_map(
        fn(string $title) => $this -> get_page_from_title($title),
        $titles
    	)
    );
  }

  public function get_current_page(): WP_Post {
    return get_post();
  }

  public function get_page_menu(): array {
    return wp_get_nav_menus();
  }

  public function get_featured_image(WP_Post $page): Maybe {
    return MaybeCompanion :: to_maybe(
      get_the_post_thumbnail_url($page, 'large')
    );
  }

  public function get_post_from_url(string $target_url): Maybe {
    $urls = array_reduce(
      get_pages(),
      fn(array $acc, WP_Post $page) => array_merge([get_permalink($page) => $page], $acc),
      []
    );
    return MaybeCompanion :: to_maybe($urls[$target_url]);
  }

  // Function to find out whether the `$current_post` needs the vitality menu.
  public function is_page_needing_vitality(WP_Post $current_post): bool {
    $pages = $this -> get_pages_from_titles(PAGES_NEEDING_VITALITY);
    return in_array($current_post, $pages)
      || $this -> is_child_of($current_post, $pages);
  }

  // Retrieve all published menu items.
  //The default predicate is to return all top level pages (no parent).
  public function get_nav_menu_items(array $menus): array {
    return array_filter(
      wp_get_nav_menu_items($menus[0]),
      fn(WP_Post $menu_item): bool => $menu_item -> post_parent == 0
    );
  }

  /*
  Retrieve the menu items for the `vitality` menu.
  */
  public function get_vitality_menu_items(array $menus): array {
  	// Get the menu_items for the `Vitality menu`.
    $predicate = fn(WP_Post $page): bool =>
      $this -> is_child_of(
        $page,
        $this -> get_pages_from_titles(PAGES_NEEDING_VITALITY)
    );
    return array_filter(
      wp_get_nav_menu_items($menus[0]),
      $predicate
    );
  }

  // Check if a page is a `$child` of at least one of the `$parents`.
  public function is_child_of(WP_Post $child, array $parents): bool {
  	foreach($parents as $parent)  {
  		if ($child -> post_parent === $parent -> ID) return true;
  	}
  	return false;
  }

  //find_if, use a predicate to retrieve an element from an array or `None` if not found.
  public function find_if(array $array, callable $predicate): Maybe {
  	foreach($array as $element) {
  		if ($predicate($element)) return new Just($element);
  	}
  	return new None;
  }

  /*
  Using a title, find the corresponding page having that title or `None` if not found.
  */
  public function get_page_from_title(string $title): Maybe {
  	return $this -> find_if(get_pages(), fn($page) =>
  		strtolower($page -> post_title) === strtolower($title)
  	);
  }

  /*
  Retrieve all child pages of `$parent`.
  Returns an array of child page objects sorted by date, descending order.
  */
  public function find_child_pages_of_parent(WP_Post $parent): array {
  	return get_pages(
  		array(
  			'parent' => $parent -> ID,
  			'sort_order' => 'DESC',
  			'sort_column' => 'post_date'
  		)
  	);
  }
  /*
  Find the most recent (by posting date) child page from a parent. Returns `None` if noting found.
  */
  public function find_most_recent_child_page(WP_Post $parent): Maybe {
  	$child_pages = $this -> find_child_pages_of_parent($parent);
  	return (sizeof($child_pages) > 0) ? new Just($child_pages[0]) : new None;
  }

  // maps an array of `pages` to an array with the page ids.
  public function get_id_from_pages(array $pages): array {
  	return array_map(
  		fn(WP_Post $page): int => $page -> ID,
  		$pages
  	);
  }

  // Check if the `$current_post` is the home page.
  public function is_on_home(WP_Post $current_post): bool {
  	return strtolower($current_post -> post_title) === strtolower(HOME_PAGE);
  }
}
?>
