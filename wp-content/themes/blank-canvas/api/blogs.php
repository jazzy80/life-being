<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/blogs/(?P<page>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_blogs',
  ) );
} );

require_once 'articles.php';

function get_blogs (WP_REST_Request $req): array {
  return get_articles_for_page(new \models\PageModel, BLOG_PAGE, $req);
}
?>
