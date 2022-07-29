<?php
  // Retrieve the current post.
  $current_post = get_post();
  // Retrieve the navbar menu items.
  $menu_items = array_filter(
    PageModel :: get_nav_menu_items(wp_get_nav_menus()),
    fn(WP_Post $menu_item): bool =>
      PageModel :: is_on_home($current_post)
        ? true : strtolower($menu_item -> title) !== HOME_PAGE
  );
  $lower_navbar = new LowerNavBarView($menu_items);
  $upper_navbar = new UpperNavBarView;
  $header = new HeaderView($upper_navbar, $lower_navbar);
  echo $header -> display();
?>
