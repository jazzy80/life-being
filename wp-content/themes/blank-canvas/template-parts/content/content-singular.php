<?php

use Controller\ArticleController;
use Controller\DefaultPageController;
use Controller\HomeController;
use Controller\PoetryController;
use Data\Page\PageRepository;
use Views\Builders\PageBuilder;
use Views\Services\PageService;

$builder         = new PageBuilder();
$page_repository = new PageRepository();
$page_service    = new PageService( $page_repository );

$current_url = parse_url(
	$page_repository->get_url_for_post(
		$page_repository->get_current_page()
	)
)["path"];

$controller = match ( $current_url ) {
	"/" => new HomeController,
	"/being-blogs/", "/poetry/" => new ArticleController( $builder ),
	default => new DefaultPageController( $builder ),
};

echo $controller->handle()->display();

?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>