<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/poetry/(?P<page>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_poetry',
  ) );
} );

function get_poetry ($data) {
  $poetry_page = get_page_from_title(POETRY_PAGE);
  require_once 'articles.php';
  return get_articles($data, $poetry_page);
}
?>
