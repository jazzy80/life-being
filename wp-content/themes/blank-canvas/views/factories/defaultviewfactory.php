<?php

// Class responsible for creating the needed views.
class DefaultViewFactory extends AbstractViewFactory {
  public function create_header(): IView {
    // Create a lower and upper navbar.
    $lower_navbar = new LowerNavBarView($this -> menu_items);
    $upper_navbar = new UpperNavBarView;
    // Create the header for the page and render it, using the created navbars.
    return new HeaderView(new Just($upper_navbar), new Just($lower_navbar));
  }

  public function create_body(): IView {
    // Assemble the leftpane for the page.
    $left_pane  = $this -> get_left_pane();
    $text_body  = $this -> get_text_body();
    // Assemble the right pane.
    $right_pane = $this -> get_right_pane();
    // Decorate the right pane.
    $right_pane_decorator = new RightPaneDecorator(
      $right_pane,
      'most-recent-container'
    );

    // Create a new compositeView encompassing the complete page body.
    return new CompositeView(
      [
        $left_pane,
        $text_body,
        $right_pane_decorator,
      ]
    );
  }

  private function get_left_pane(): IView {
    return $this -> page_model -> is_page_needing_vitality($this -> page)
      ? new VitalityView(
        $this-> page_model,
        $this -> page,
        $this -> menu_items
      ) : new RightPaneDecorator(
        new CompositeView([]),
        'most-recent-container'
      );
  }

  private function get_right_pane(): IView {
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
     return new CompositeView(
	       MaybeCompanion::flattenArray(
    	     [
            $recent_blog_view,
            $recent_poetry_view,
            $recent_inspire_view
    		   ]
         )
       );
     }
   }
?>
