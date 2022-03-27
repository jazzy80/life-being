<?php

// Retrieve all published menu items.
$menus = wp_get_nav_menus();
  $menu_items = sizeof($menus) > 0
    ? array_filter(wp_get_nav_menu_items($menus[0]), function($item) {
    return $item -> post_parent == 0;
  }) : [];
// Retrieve the featured image from a post.
$thumbnail_url = wp_get_attachment_url(get_post_thumbnail_id(get_post() -> ID), 'thumbnail');
?>
<header class="header"
<?php
  // If a featured image exists, use it as the header background.
  if($thumbnail_url) {
    echo 'style="background-image: url(' . $thumbnail_url . ')"';
  }
  ?>
>
  <div class="navbar upper-navbar">
    <object class="logo" data="/resources/logo lifebeing.title.svg"> </object>
    <ul class="nav-links upper-navbar-links">
      <li><a href="#">Life Being Inspiration</a></li>
      <li><a href="#">Being Child Illustrations</a></li>
      <li><a href="#">Life Being Atelier</a></li>
    </ul>
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
    <input id="menu-toggle" type="checkbox"/>
    <ul class="nav-links lower-navbar-links">
        <?php foreach ($menu_items as $item){
        echo "<li><a href=" . $item -> url . ">" . $item -> title . "</a></li>";
            }
        ?>
    </ul>
    <label for="menu-toggle" class="hamburger-container">
      <span class="hamburger-menu"></span>
    </label>
  </div>
</header>
