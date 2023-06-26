<?php
namespace models;
class PageModel {
  private \wpdb $db_client;

  function __construct(\wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  public function get_all_pages(): array {
    return $this -> db_client -> get_results(
      "SELECT * FROM wp_posts WHERE post_type = 'page' AND post_status = 'publish';",
    );
  }
}
?>
