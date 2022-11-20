<?php
namespace views;
class LowerNavBarView implements IView {
  public function __construct(\models\PageModel $page_model, array $menu_items) {
    $this -> page_model = $page_model;
    $this -> menu_items = $menu_items;
  }

  public function display(): string {
    $navbar = <<< EOL
    <div class="navbar lower-navbar">
      <input id="menu-toggle" type="checkbox"/>
      <ul class="nav-links lower-navbar-links">
    EOL;
    $root_page = $this -> page_model -> get_page_root_parent(
      $this -> page_model -> get_current_page()
    );
    $navbar_links = array_reduce(
      $this -> menu_items,
      fn(string $html_page, \WP_Post $menu_item) =>
        $html_page .
        '<li>
          <a ' . ($this -> page_model -> get_url_for_post($root_page) === $menu_item -> url
                    ? 'class="active-link"' : '') .
            'href="' . $menu_item -> url . '">' .
            $menu_item -> title .
          '</a>
        </li>',
        ''
      );
    $hamburger_menu = <<< EOL
      </ul>
      <label for="menu-toggle" class="hamburger-container">
        <span class="hamburger-menu"></span>
      </label>
    </div>
    EOL;
    return $navbar. $navbar_links . $hamburger_menu;
  }
}
?>
