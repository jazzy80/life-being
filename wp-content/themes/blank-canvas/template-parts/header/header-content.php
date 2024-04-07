<?php

/**
 *  Script responsible for createing the header part of all pages.
 */

use Data\Page\PageRepository;
use Views\HeaderView;
use Views\Services\PageService;
use Views\UpperNavBarView;
use Views\ViewModels\MenuItemsViewModel;

$page_repository = new PageRepository();
$page            = $page_repository->get_current_page();

$page_service = new PageService($page_repository);
$menu_items = new MenuItemsViewModel($page_service->get_menu_items());

// Generate the navbar using the menu items.
$navbar = new UpperNavBarView($menu_items);

// Using the navbar, create the header and display.
$header = new HeaderView($navbar);

echo $header->display();
