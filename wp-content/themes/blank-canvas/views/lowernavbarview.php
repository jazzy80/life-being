<?php
require_once 'iview.php';

class LowerNavBarView implements IView {
  public function __construct(array $menu_items) {
    $this -> menu_items = $menu_items;
  }

  public function display(): string {
    $upper_part = <<< EOL
    <div class="navbar lower-navbar">
      <input id="menu-toggle" type="checkbox"/>
      <ul class="nav-links lower-navbar-links">
    EOL;
    $navbar_links = array_reduce(
      $this -> menu_items,
      fn(string $html_page, WP_Post $menu_item) =>
        $html_page .
        "<li>
          <a href=" . $menu_item -> url . ">" .
            $menu_item -> title .
          "</a>
        </li>",
        ''
      );
    $lower_part = <<< EOL
      </ul>
      <label for="menu-toggle" class="hamburger-container">
        <span class="hamburger-menu"></span>
      </label>
    </div>
    EOL;
    return $upper_part . $navbar_links . $lower_part;
  }
}
?>
