<?php
  $thumbnail_url = get_the_post_thumbnail_url(null, 'large');
  if($thumbnail_url) {
    echo <<< EOL
    <script>
      var body = document.querySelector('body');
      body.style.backgroundImage = "url($thumbnail_url)";
    </script>
EOL;
  }
?>

<header class="header">
  <div class="navbar upper-navbar">
    <object class="logo" data="/resources/logo lifebeing.title.svg"> </object>
    <ul class="nav-links upper-navbar-links">
      <li><a href="/">Be Home</a></li>
      <li><a href="/being-me-being-you-2">Life Being Inspirations</a></li>
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
  <?php
  // Retrieve the current post.
  $current_post = get_post();
  // Retrieve the navbar menu items.
  $menu_items = PageModel  :: get_nav_menu_items(wp_get_nav_menus());

  // if we are not on `Home` make the navbar and hamburger visible.
  if (!PageModel :: is_on_home($current_post)) {
    echo <<< EOL
    <div class="navbar lower-navbar">
      <input id="menu-toggle" type="checkbox"/>
      <ul class="nav-links lower-navbar-links">
EOL;
    foreach ($menu_items as $item){
      if (strtolower($item -> title) !== HOME_PAGE) {
        echo "<li><a href=" . $item -> url . ">" . $item -> title . "</a></li>";
      }
    }
    echo <<< EOL
      </ul>
      <label for="menu-toggle" class="hamburger-container">
        <span class="hamburger-menu"></span>
      </label>
    </div>
EOL;
}
?>
</header>
