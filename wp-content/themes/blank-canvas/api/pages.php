<?php

use models\PageModel;

add_action('rest_api_init', function () {
  register_rest_route( 'api/', 'pages/', array(
    'methods' => 'GET',
    'callback' => 'get_all_pages'
  ) );
} );

add_action('rest_api_init', function (){

} );

function get_all_pages(WP_REST_Request $req): array {
  global $wpdb;
  $page_model = new PageModel($wpdb);
  return $page_model -> get_all_pages();
}