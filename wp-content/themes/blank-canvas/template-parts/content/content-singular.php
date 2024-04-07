<?php

use Controller\ArticleController;
use Controller\AtelierController;
use Controller\DefaultPageController;
use Controller\GuestBookController;
use Controller\HomeController;
use Data\GuestBook\GuestBookRepository;
use Data\Page\PageRepository;
use Domain\Exceptions\ProductDoesNotExist;
use Views\Builders\PageBuilder;
use Views\Services\PageService;


$builder         = new PageBuilder();
$page_repository = new PageRepository();
$page_service    = new PageService($page_repository);

$current_url = parse_url($page_repository->get_current_page()->get_url())["path"];
global $wpdb;

$product_id = explode("=", $_SERVER['QUERY_STRING'])[1];

$controller = match ($current_url) {
	"/" => new HomeController,
	"/being-blogs/", "/poetry/" => new ArticleController($builder),
	"/life-being-atelier/" => new AtelierController($builder),
	"/guestbook/" => new GuestBookController($builder, new GuestBookRepository($wpdb)),
	default => new DefaultPageController($builder),
};

try {
	echo $controller->handle()->display();
} catch (ProductDoesNotExist $ex) {
	echo "<h4 style=\"margin:1.5rem auto;\">Het opgegeven product kon niet worden gevonden.</h4>";
}

?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>