<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/poetry/(?P<page>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_poetry',
  ) );
} );

require_once 'articles.php';

function get_poetry (WP_REST_Request $req): array {
  return get_articles_for_page(new models\PageModel, POETRY_PAGE, $req);
}
?>
