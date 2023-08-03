<?php
$page_repository = new \data\page\PageRepository();
$page = $page_repository->get_current_page();

$header_title = HEADER_TITLES[strtolower($page->post_title)] ?? DEFAULT_HEADER_TITLE;
$header_subtitle = HEADER_SUBTITLES[strtolower($page->post_title)] ?? DEFAULT_HEADER_SUBTITLE;

$builder = new views\builders\PageBuilder();

$page_service = new \views\services\PageService($page_repository);
$menu_items = new \views\viewmodels\MenuItemsViewModel($page_service->get_menu_items());
$navbar = new \views\UpperNavBarView($menu_items);
$builder->add_page_component(new \views\HeaderView($header_title, $header_subtitle, $navbar));
$header = $builder->build();
echo $header->display();
