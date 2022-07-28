<?php
require_once 'iview.php';

class VitalityView implements IView {
  public function __construct(WP_Post $current_post, array $menus) {
    $this -> current_post = $current_post;
    $this -> menus = $menus;
  }
  /*
  Get the vitality left side bar menu HTML string.
  */
  public function display(): string {
  	// Retrieve the menu items beloning to `vitality`.
  	$menu_items = PageModel :: get_vitality_menu_items($this -> menus);

  	// render the vitality menu.
  	return
  	'<div class="sidebar">
  	 <h5 class="sidebar-title"> Vitality </h5>
  		<ul>' .
  	// If on a child page of a sidebar page.
    // create a backlink back to its parent.
  	(PageModel :: is_child_of($this -> current_post, PageModel :: get_pages_from_titles(PAGES_NEEDING_VITALITY))
  	? $this -> create_backlink_to_parent() : '') .
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

  private function create_backlink_to_parent(): string {
  	return '<span class="sidebar-back-link">
  	 	 <i class="fas fa-angle-double-left"></i>
  		 <li>
  		 	<a href="' . filter_var(get_permalink($this -> current_post -> post_parent), FILTER_SANITIZE_URL) . '">
  				Terug
  			</a>
  		</li>
  		</span>';
  }
}
?>
