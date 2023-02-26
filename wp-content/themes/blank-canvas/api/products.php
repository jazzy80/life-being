<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/products/', array(
    'methods' => 'GET',
    'callback' => 'get_products'
  ) );
} );


function get_products (WP_REST_Request $req): array {
    global $wpdb;
    $category = $req -> get_query_params()['category'];
    $page = $req -> get_query_params()['page'];
    $productModel = new \models\ProductModel($wpdb);
    $products = $category ? $productModel -> get_products_by_category($category) 
        : $productModel -> get_products();
    return [
        'count' => sizeof($products),
        'paginationSize' => PRODUCTS_PAGINATION_SIZE,
        'products' => $page != null ?  array_slice(
            $products, $page * PRODUCTS_PAGINATION_SIZE, 
            PRODUCTS_PAGINATION_SIZE
        ) : $products
    ];
}
?>