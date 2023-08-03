<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/product/(?<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'get_product'
  ) );
} );

function get_product(WP_REST_Request $req): array {
    global $wpdb;
    $product_model = new \models\ProductModel($wpdb);
    $product_id = $req['id'];
    return $product_model -> get_product_by_id($product_id);
}
?>