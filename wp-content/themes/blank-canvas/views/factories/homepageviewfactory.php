<?php

// Class responsible for creating the Home page View.
class HomePageViewFactory extends AbstractViewFactory {
  public function create_header(): IView {
    $upper_navbar = new UpperNavBarView;
    return new HeaderView(new Just($upper_navbar), new None);
  }

  public function create_body(): IView {
    return $this -> get_text_body();
  }
}
?>
