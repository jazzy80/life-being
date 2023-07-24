<?php
namespace data\models;

class GuestBookModel {
  function __construct(\wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  function get_all_entries(): array {
    $result = $this -> db_client -> get_results(
      'SELECT * FROM wp_guestbook ORDER BY created_on DESC LIMIT 15',
      OBJECT
    );
    return array_map(
      function (object $entry): \data\GuestBookEntry {
        return new \data\GuestBookEntry(
          $entry -> name,
          $entry -> created_on,
          $entry -> text_body
        );
      },
      $result
    );
  }

  function create_guestbook_entry(string $name, string $comment): void {
    $this -> db_client -> get_results($this -> db_client -> prepare(
      'INSERT INTO wp_guestbook (name, text_body) VALUES (%s, %s)',
      array($name, $comment)
    ));
  }
}
?>
