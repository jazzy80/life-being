<?php

// Retrieve all published menu items.
$menus = wp_get_nav_menus();
$menu_items = [];
if (sizeof($menus) > 0) {
  $menu_items = array_filter(wp_get_nav_menu_items($menus[0]), function($item) {
    return $item -> post_parent == 0;
  });
}
?>
<header class="header">
  <div class="navbar upper-navbar">
    <object class="logo" data="/resources/heartscan2.svg" width="60" height="40"> </object>
    <input id="menu-toggle" type="checkbox"/>
    <ul class="nav-links upper-navbar-links">
      <li><a href="#">Life Being Inspiration</a></li>
      <li><a href="#">Being Child Illustrations</a></li>
      <li><a href="#">Life Being Atelier</a></li>
    </ul>
    <label for="menu-toggle" class="hamburger-container upper-navbar">
      <span class="hamburger-menu upper-navbar"></span>
    </label>
  </div>
  <div class="title-with-btns">
    <i class="fas fa-chevron-left prev-button"></i>
    <div class="titles">
      <h1 class="title">Life Being</h1>
      <h3 class="subtitle">Spirit of Being You</h3>
    </div>
    <i class="fas fa-chevron-right next-button"></i>
  </div>
  <div class="navbar lower-navbar">
    <ul class="nav-links lower-navbar-links">
        <?php foreach ($menu_items as $item){
        echo "<li><a href=" . $item -> url . ">" . $item -> title . "</a></li>";
            }
        ?>
    </ul>
  </div>
</header>
