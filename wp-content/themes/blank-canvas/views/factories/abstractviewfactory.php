<?php

// Interface for a abstract factory concerned with the production of UI elements.
abstract class AbstractViewFactory {
  protected WP_Post $page;
  protected array $menus;
  protected array $menu_items;
  protected PageModel $page_model;

  protected function __construct(PageModel $page_model, WP_Post $page, array $menus) {
    $this -> page_model = $page_model;
    $this -> page = $page;
    $this -> menus = $menus;
    // Retrieve all top level menu items for the navbar.
    $this -> menu_items = PageModel :: get_nav_menu_items($menus);
  }

  //Function that is implemented like a registry;
  // a specific factory instance can be retrieved for a specific `page`.
  public static function get_view_factory(
    PageModel $page_model,
    WP_Post $page,
    array $menus
  ): AbstractViewFactory {
    switch (strtolower($page -> post_title)) {
      case HOME_PAGE: return new HomePageViewFactory($page_model, $page, $menus);
      default: return new DefaultViewFactory($page_model, $page, $menus);
    }
  }
  abstract public function create_header(): IView;
  abstract public function create_body(): IView;

  // Default implementation for the creation of the main text body.
  protected function get_text_body(): IView {
    return new TextBodyView($this -> page);
  }
}
?>
