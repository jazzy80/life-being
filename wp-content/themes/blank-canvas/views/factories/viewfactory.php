<?php


// Class responsible for creating the UI views.
namespace views\factories;
class ViewFactory implements AbstractViewFactory {
  const SIDEBAR_CLASS = 'most-recent-container';

  protected \WP_Post $page;
  protected array $menus;
  protected array $menu_items;
  protected \models\PageModel $page_model;

  public function __construct(\serviceproviders\ModelProvider $model_provider) {
  $this -> page_model = $model_provider -> get_page_model();
  $this -> page = $this -> page_model -> get_current_page();
  $this -> menus = $this -> page_model -> get_page_menu();
  // Retrieve all top level menu items for the navbar.
  $this -> menu_items = $this -> page_model -> get_nav_menu_items($this -> menus);
}
  public function create_header(): \views\IView {
    // Create a lower and upper navbar.
    $lower_navbar = new \views\LowerNavBarView($this -> page_model, $this -> menu_items);
    $upper_navbar = new \views\UpperNavBarView;
    // Create the header for the page and render it, using the created navbars.
    return new \views\HeaderView(
      new \utils\None,
      new \utils\None,
      new \utils\Just($upper_navbar),
      new \utils\Just($lower_navbar)
    );
  }

  public function create_text_body(): \views\IView {
    return new \views\TextBodyView($this -> page);
  }

  public function create_vitality_menu(): \views\IView {
    return new \views\VitalityView(
      $this -> page_model,
      $this -> page,
      $this -> page_model -> get_vitality_menu_items($this -> menus)
    );
  }

  public function create_left_pane(): \views\IView {
    // TODO: Generate a leftPane.
    return new \views\decorators\SideBarDecorator(
      new \views\CompositeView([]),
      ViewFactory :: SIDEBAR_CLASS
    );
  }

  public function create_right_pane(): \views\IView {
    // Retrieve most recent article pages.
    $most_recent_pages = array_map(
      function(array $page_title_pair): \utils\Maybe {
        [$page_title, $sub_title] = $page_title_pair;
        return $this -> page_model -> get_page_from_title($page_title) -> bind(
          fn($page) => $this -> page_model -> find_most_recent_child_page($page)
           -> map(fn($child) => new \views\MostRecentArticleView($child, $sub_title))
        );
      },
      PAGES_IN_RIGHT_PANE
    );
     // Use the compositeView to combine the view into a right pane.
     return new \views\decorators\SideBarDecorator(
       new \views\CompositeView(
	       \utils\MaybeCompanion::flattenArray(
           $most_recent_pages
           )
         ),
         ViewFactory :: SIDEBAR_CLASS
       );
     }
   }
?>
