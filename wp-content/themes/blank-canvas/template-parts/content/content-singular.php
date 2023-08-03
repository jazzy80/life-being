<?php

use \data\page\PageRepository;
use views\builders\PageBuilder;
use \views\TextBodyView;

$builder = new PageBuilder();
$page_repository = new PageRepository();
$current_page = $page_repository->get_current_page();

switch (strtolower($current_page->post_title)) {
  case HOME_PAGE:
    $builder->add_page_component(new TextBodyView());
    echo $builder->build()->display();
    break;
}

?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>