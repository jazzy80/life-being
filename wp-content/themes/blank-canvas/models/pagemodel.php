<?php
namespace models;
class PageModel {
  private \wpdb $db_client;

  function __construct(\wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  public function get_all_pages(): array {
    return $this -> db_client -> get_results(
      <<< EOL
      SELECT ID, post_title, guid
      FROM wp_posts 
      WHERE post_type = 'page' AND post_status = 'publish';
      EOL,
      ARRAY_A
    );
  }

  public function get_page_by_id(int $id): object{
    return $this -> db_client -> get_row(
      $this -> db_client -> prepare(
        <<< EOL
        SELECT ID, post_title, guid, post_content
        FROM wp_posts
        WHERE ID = %s
        EOL,
        array($id)
      ),
    );
  }
}
?>
