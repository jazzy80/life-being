<?php
abstract class BaseController {
  protected PageModel $page_model;
  protected WP_Post $current_page;
  protected array $menus;

  public function __construct(PageModel $page_model) {
    $this -> page_model = $page_model;
    // Retrieve the current post and menus.
    $this -> current_page = get_post();
    $this -> menus = wp_get_nav_menus();
  }

  public function get(): void {
    $view = $this -> get_view();
    echo $view -> display();
  }

  abstract protected function get_view(): IView;

  // Default implementation for getting an ViewFactory instance.
  protected function get_view_factory(): AbstractViewFactory {
    // init viewfactory.
    return AbstractViewFactory :: get_view_factory(
      $this -> page_model,
      $this -> current_page,
      $this -> menus
    );
  }
}
?>
