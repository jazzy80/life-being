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
    return new \views\HeaderView(new \utils\Just($upper_navbar), new \utils\Just($lower_navbar));
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
  	// Retrieve the most recent blog, poem and inspire pages as a
    // Maybe, since some pages might not be found.
  	$blog_page =    $this -> page_model -> get_page_from_title(BLOG_PAGE);
  	$poetry_page =  $this -> page_model -> get_page_from_title(POETRY_PAGE);
  	$inspire_page = $this -> page_model -> get_page_from_title(INSPIRE_PAGE);

    // Create articleViews from the pages.
    $recent_blog_view = $blog_page -> bind(fn($blog) =>
	   $this -> page_model -> find_most_recent_child_page($blog) -> map(
       fn($recent_blog) =>
  			new \views\MostRecentArticleView(
          $recent_blog,
          "Meest recente blog"
        )
      )
    );
    $recent_poetry_view = $poetry_page -> bind(fn($poetry) =>
		  $this -> page_model -> find_most_recent_child_page($poetry) -> map(
        fn($recent_poetry) =>
        new \views\MostRecentArticleView(
          $recent_poetry,
          "Meest recente gedicht"
        )
      )
    );
  	$recent_inspire_view = $inspire_page -> bind(fn($inspire) =>
    	  $this -> page_model -> find_most_recent_child_page($inspire) -> map(
          fn($recent_inspire) =>
          new \views\MostRecentArticleView(
            $recent_inspirce,
            "Meest recent inspire"
         )
       )
     );
     // Use the compositeView to combine the view into a right pane.
     return new \views\decorators\SideBarDecorator(
       new \views\CompositeView(
	       \utils\MaybeCompanion::flattenArray(
      	     [
              $recent_blog_view,
              $recent_poetry_view,
              $recent_inspire_view
      		   ]
           )
         ),
         ViewFactory :: SIDEBAR_CLASS
       );
     }
   }
?>
