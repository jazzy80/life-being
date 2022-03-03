<?php

// Retrieve all published root(parent = null) pages, to set on navbar.
$args = [
    'post_status' => 'publish',
    'parent' => 0
];
$pages = get_pages($args);
?>
<header class="header">
  <div class="navbar upper-navbar">
    <object class="logo" data="/resources/heartscan2.svg" width="60" height="40"> </object>
    <ul class="nav-links upper">
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
  <div class="navbar lower">
    <ul class="nav-links">
        <?php foreach ($pages as $page){
        echo "<li><a href=" . get_permalink($page) . ">" . $page -> post_title . "</a></li>";
            }
        ?>
    </ul>
  </div>
</header>
