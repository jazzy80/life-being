<?php
namespace models;

class AtelierModel {
  private \wpdb $db_client;

  function __construct(\wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  function get_atelier_images_by_category(string $category): array {
    return $this -> db_client -> get_results(
      $this -> db_client -> prepare(
        <<< EOL
        SELECT guid FROM wp_posts wp
        INNER JOIN wp_term_relationships wtr ON wp.ID = wtr.object_id
        INNER JOIN wp_terms wt on wtr.term_taxonomy_id = wt.term_id
        WHERE LOWER(wt.slug) = LOWER(%s)
        EOL,
        array($category)
      ),
      ARRAY_N
    );
  }
}
?>
