<?php
add_action('rest_api_init', function () {
  register_rest_route( 'api/', '/atelier/', array(
    'methods' => 'GET',
    'callback' => 'get_atelier_images'
  ) );
} );

function get_atelier_images(WP_REST_Request $req): array {
  global $wpdb;
  $atelier_model = new \models\AtelierModel($wpdb);
  $category = $req -> get_query_params()['category'];
  $page = $req -> get_query_params()['page'];
  $images = $atelier_model -> get_atelier_images_by_category($category);
  return [
    'count' => sizeof($images), 
    'paginationSize' => PAGINATION_CHILD_BEING,
    'images' => $page != null ?  array_slice($images, $page * PAGINATION_CHILD_BEING, PAGINATION_CHILD_BEING) : $images
  ];
}
