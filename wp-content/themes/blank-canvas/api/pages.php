<?php

use models\PageModel;

add_action('rest_api_init', function () {
  register_rest_route( 'api/', 'pages/', array(
    'methods' => 'GET',
    'callback' => 'get_all_pages'
  ) );
} );

add_action('rest_api_init', function (){
  register_rest_route( 'api/', 'pages/(?<id>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_page_by_id'
  ));
} );

function get_all_pages(WP_REST_Request $req): array {
  global $wpdb;
  $page_model = new PageModel($wpdb);
  return $page_model -> get_all_pages();
}

function get_page_by_id(WP_REST_Request $req): object{
  global $wpdb;
  $page_model = new PageModel($wpdb);
  return $page_model -> get_page_by_id($req['id']);
}