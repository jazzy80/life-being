<?php
class GuestBookModel {
  function __construct(wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  function get_all_entries(): array {
    $result = $this -> db_client -> get_results(
      'SELECT * FROM wp_guestbook',
      OBJECT
    );
    return array_map(
      function (object $entry): GuestBookEntry {
        return new GuestBookEntry(
          $entry -> name,
          $entry -> created_on,
          $entry -> text_body
        );
      },
      $result
    );
  }
}
?>
