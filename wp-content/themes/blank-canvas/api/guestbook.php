<?php
add_action('rest_api_init', function () {
  register_rest_route( 'api/', '/guestbook/', array(
    'methods' => 'POST',
    'callback' => 'create_guestbook_entry',
  ) );
} );

function create_guestbook_entry(WP_REST_Request $req): void {
  global $wpdb;
  $body = json_decode($req -> get_body());
  $name = filter_var($body -> name, FILTER_SANITIZE_STRING);
  $comment = filter_var($body -> comment, FILTER_SANITIZE_STRING);
  $guestbook_model = new GuestBookModel($wpdb);
  $guestbook_model -> create_guestbook_entry($name, $comment);
}
?>
