<?php

use Data\Page\PageRepository;
use Views\HeaderView;
use Views\Services\PageService;
use Views\UpperNavBarView;
use Views\ViewModels\MenuItemsViewModel;

$page_repository = new PageRepository();
$page            = $page_repository->get_current_page();

$header_title = HEADER_TITLES[strtolower($page->post_title)] ?? DEFAULT_HEADER_TITLE;
$header_subtitle = HEADER_SUBTITLES[strtolower($page->post_title)] ?? DEFAULT_HEADER_SUBTITLE;

$builder = new Views\Builders\PageBuilder();

$page_service = new PageService($page_repository);
$menu_items = new MenuItemsViewModel($page_service->get_menu_items());
$navbar = new UpperNavBarView($menu_items);
$builder->add_page_component(new HeaderView($header_title, $header_subtitle, $navbar));
$header = $builder->build();
echo $header->display();
