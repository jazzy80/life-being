<?php
namespace views;
class VitalityView implements IView {
  private PageModel $page_model;
  private WP_Post $current_post;
  private array $menu_items;

  public function __construct(PageModel $page_model, WP_Post $current_post, array $menu_items) {
    $this -> page_model = $page_model;
    $this -> current_post = $current_post;
    $this -> menu_items = $menu_items;
  }
  /*
  Get the vitality left side bar menu HTML string.
  */
  public function display(): string {
  	// Render the vitality menu.
  	return
  	'<div class="sidebar">
  	 <h5 class="sidebar-title"> Vitality </h5>
  		<ul>' .
  	// If on a child page of a sidebar page.
    // Create a backlink back to its parent.
  	($this -> page_model -> is_child_of(
      $this -> current_post,
      $this -> page_model -> get_pages_from_titles(PAGES_NEEDING_VITALITY)
      )
  	? $this -> create_backlink_to_parent() : '') .
  	// Concantenate with the rest of the menu items below.
  	// Create all the menu items, and concatenate to html string.
    // Use links of child pages to populate the sidebar.
  	array_reduce($this -> menu_items, function(string $html, WP_Post $menu_item): string {
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
