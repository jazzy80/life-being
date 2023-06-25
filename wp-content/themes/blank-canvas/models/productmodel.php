<?php
namespace models;

class ProductModel{
  private \wpdb $db_client;

  function __construct(\wpdb $db_client) {
    $this -> db_client = $db_client;
  }

  function get_products(): array {
    return $this -> db_client -> get_results(
        $this -> db_client -> prepare(
        <<< EOL
        SELECT 
          wp.*, 
          wt.name as category_name, 
          wtt.description as category_description, 
          wt.slug as category_slug 
        FROM wp_products wp
        LEFT JOIN wp_category_product wcp on wp.id = wcp.product_id
        LEFT JOIN wp_terms wt on wt.term_id = wcp.category_id
        LEFT JOIN wp_term_taxonomy wtt on wtt.term_id = wt.term_id
        ORDER BY id DESC;
        EOL,
        array()
        )
    );
  }

  function get_products_by_category(string $category): array {
       return $this -> db_client -> get_results(
        $this -> db_client -> prepare(
        <<< EOL
        SELECT wp.* FROM wp_products wp
        INNER JOIN wp_category_product wcp on wp.id = wcp.product_id
        INNER JOIN wp_terms wt on wt.term_id = wcp.category_id
        WHERE LOWER(wt.slug) = LOWER(%s)
        ORDER BY id DESC;
        EOL,
        array($category)
      ),
    );
  }

  function get_product_by_id($product_id): array{
    return $this -> db_client -> get_results(
      $this -> db_client -> prepare(
        <<< EOL
        SELECT * from wp_products wp
        WHERE id = %d
        EOL,
        array($product_id)
      ),
    );
  }
}
?>
