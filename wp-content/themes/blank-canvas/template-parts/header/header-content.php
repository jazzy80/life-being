<?php
$args = [
    'post_status' => 'publish'
];
$pages = get_pages($args);

// MainPages are pages without a parent
$mainPages = array_filter($pages, function($page) {
    return $page -> post_parent == 0;
});

$pagesWithUrl = array_reduce($mainPages, function($acc, $page){
    $acc[$page -> post_title] = get_permalink($page);
    return $acc;
},
    []);
?>
<div class="header">
    <div class="navbar upper-navbar">
      <ul class="nav-links upper">
        <li><a href="#">Life Being Inspiration</a></li>
        <li><a href="#">Being Child Illustrations</a></li>
        <li><a href="#">Life Being Atelier</a></li>
      </ul>
    </div>
    <div class="title-with-btns">
      <button class="prev-button">Vorige</button>
      <div class="titles">
        <h1 class="title">Life Being</h1>
        <h3 class="subtitle">Spirit of Being You</h3>
      </div>
      <button class="next-button">Volgende</button>
    </div>
  </div>
  <div class="navbar">
    <ul class="nav-links">
        <?php foreach ($pagesWithUrl as $title => $url){
        echo "<li><a href=" . $url . ">" . $title . "</a></li>";
            }
        ?>
    </ul>
  </div>
