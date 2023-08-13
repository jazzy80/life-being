<?php

use Controller\ArticleController;
use Controller\AtelierShopController;
use Controller\DefaultPageController;
use Controller\GuestBookController;
use Controller\HomeController;
use Controller\ProductDetailsController;
use Data\GuestBook\GuestBookRepository;
use Data\Page\PageRepository;
use Views\Builders\PageBuilder;
use Views\Services\PageService;


$builder         = new PageBuilder();
$page_repository = new PageRepository();
$page_service    = new PageService( $page_repository );

$current_url = parse_url( $page_repository->get_current_page()->get_url() )["path"];

global $wpdb;

$controller = match ( $current_url ) {
	"/" => new HomeController,
	"/being-blogs/", "/poetry/" => new ArticleController( $builder ),
	"/guestbook/" => new GuestBookController( $builder, new GuestBookRepository( $wpdb ) ),
    "/life-being-atelier-shop/" => new AtelierShopController ( $builder),
    "/product-details/" => new ProductDetailsController ( $builder ),
	default => new DefaultPageController( $builder ),
};

echo $controller->handle()->display();

?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>