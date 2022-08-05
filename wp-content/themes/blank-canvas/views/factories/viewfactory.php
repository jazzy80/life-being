<?php


// Class responsible for creating the UI views.
class ViewFactory implements AbstractViewFactory {
  const SIDEBAR_CLASS = 'most-recent-container';

  protected WP_Post $page;
  protected array $menus;
  protected array $menu_items;
  protected PageModel $page_model;

  public function __construct(PageModel $page_model, WP_Post $page, array $menus) {
  $this -> page_model = $page_model;
  $this -> page = $page;
  $this -> menus = $menus;
  // Retrieve all top level menu items for the navbar.
  $this -> menu_items = $this -> page_model -> get_nav_menu_items($menus);
}
  public function create_header(): IView {
    // Create a lower and upper navbar.
    $lower_navbar = new LowerNavBarView($this -> menu_items);
    $upper_navbar = new UpperNavBarView;
    // Create the header for the page and render it, using the created navbars.
    return new HeaderView(new Just($upper_navbar), new Just($lower_navbar));
  }

  public function create_text_body(): IView {
    return new TextBodyView($this -> page);
  }

  public function create_vitality_menu(): IView {
    return new VitalityView(
      $this -> page_model,
      $this -> page,
      $this -> page_model -> get_vitality_menu_items($this -> menus)
    );
  }

  public function create_left_pane(): IView {
    // TODO: Generate a leftPane.
    return new SideBarDecorator(new CompositeView([]), ViewFactory :: SIDEBAR_CLASS);
  }

  public function create_right_pane(): IView {
  	// Retrieve the most recent blog, poem and inspire pages as a
    // Maybe, since some pages might not be found.
  	$blog_page =    $this -> page_model -> get_page_from_title(BLOG_PAGE);
  	$poetry_page =  $this -> page_model -> get_page_from_title(POETRY_PAGE);
  	$inspire_page = $this -> page_model -> get_page_from_title(INSPIRE_PAGE);

    // Create articleViews from the pages.
    $recent_blog_view = $blog_page -> bind(fn($blog) =>
	   $this -> page_model -> find_most_recent_child_page($blog) -> map(
       fn($recent_blog) =>
  			new MostRecentArticleView(
          $recent_blog,
          "Meest recent blog"
        )
      )
    );
    $recent_poetry_view = $poetry_page -> bind(fn($poetry) =>
		  $this -> page_model -> find_most_recent_child_page($poetry) -> map(
        fn($recent_poetry) =>
        new MostRecentArticleView(
          $recent_poetry,
          "Meest recente gedicht"
        )
      )
    );
  	$recent_inspire_view = $inspire_page -> bind(fn($inspire) =>
    	  $this -> page_model -> find_most_recent_child_page($inspire) -> map(
          fn($recent_inspire) =>
          new MostRecentArticleView(
            $recent_inspirce,
            "Meest recent inspire"
         )
       )
     );
     // Use the compositeView to combine the view into a right pane.
     return new SideBarDecorator(
       new CompositeView(
	       MaybeCompanion::flattenArray(
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
