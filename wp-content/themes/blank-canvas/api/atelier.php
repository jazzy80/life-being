<?php
add_action('rest_api_init', function () {
  register_rest_route( 'api/', '/atelier/', array(
    'methods' => 'GET',
    'callback' => 'get_atelier_images'
  ) );
} );

function get_atelier_images(WP_REST_Request $req): array {
  $uploads = glob(ROOT_DIR . '/wp-content/uploads/2022/05/*');
  return array_map(
    fn(string $dir): string =>
      str_replace(ROOT_DIR, '', $dir),
    $uploads
  );
}
?>
