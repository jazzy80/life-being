<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/blogs/(?P<page>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_blogs',
  ) );
} );

function get_blogs ($data) {
  $blog_page = get_page_from_title(BLOG_PAGE);
  require_once 'articles.php';
  return get_articles($data, $blog_page);
}
?>
