<?php

namespace Data\Product;

use Domain\Models\Category;
use Domain\Models\Part;
use Domain\Models\Product;
use Domain\Models\ProductOption;
use Domain\Repositories\IProductRepository;
use Utils\Utils;
use wpdb;

class ProductRepository implements IProductRepository {
	private wpdb $db_client;

	/**
	 * @param wpdb $db_client
	 */
	public function __construct( wpdb $db_client ) {
		$this->db_client = $db_client;
	}

	/**
	 * @inheritDoc
	 */
	function get_products(): array {
		$raw_products = $this->db_client->get_results(
			$this->db_client->prepare( <<< EOL
        SELECT 
          wp.id, wp.name, wp.description, wp.price, wp.image_url, wp.width, wp.height, 
          wcp.category_id as category_id,
          wt.name as category_name, 
          wtt.description as category_description, 
          wt.slug as category_slug,
          wpo.id as product_option_id,
          wpo.name as product_option_name,
          wpo.price as product_option_price,
          wpp.id as part_id,
          wpp.name as part_name,
          wpp.part as part_description,
        	wpp.width as part_width,
        	wpp.height as part_height
        FROM wp_products wp
        LEFT JOIN wp_category_product wcp on wp.id = wcp.product_id
        LEFT JOIN wp_terms wt on wt.term_id = wcp.category_id
        LEFT JOIN wp_term_taxonomy wtt on wtt.term_id = wt.term_id
        LEFT JOIN wp_product_product_option wppo on wppo.product_id = wp.id
        LEFT JOIN wp_product_option wpo on wpo.id = wppo.product_option_id
        LEFT JOIN wp_product_product_part wppp on wppp.product_id = wp.id
        LEFT JOIN wp_product_part wpp on wpp.id = wppp.part_id
        ORDER BY id DESC;
        EOL,
				OBJECT
			)
		);

		return $this->process_result( $raw_products );
	}

	/**
	 * @param array|object|null $raw_products
	 *
	 * @return Product[]
	 */
	private function process_result( array|object|null $raw_products ): array {
		$grouped_products = Utils::group_by( $raw_products, fn( object $o ) => $o->id );

		return array_map(
			fn( array $products ) => new Product(
				$products[0]->id,
				$products[0]->name,
				$products[0]->description,
				$products[0]->price,
				$products[0]->image_url,
				$products[0]->width,
				$products[0]->height,
				$products[0]->category_id ? array_map(
					fn( object $product ) => new Category(
						$product->category_name,
						$product->category_slug,
						$product->category_description,
					)
					, $products
				) : [],
				$products[0]->product_option_id ? array_map(
					fn( object $product ) => new ProductOption(
						$product->product_option_id,
						$product->product_option_name,
						$product->product_option_price,
					),
					$products
				) : [],
				Utils::array_distinct_by(array_map(
					fn(object $product) => new Part(
						$product->part_id,
						$product->part_name,
						$product->part_description,
						$product->part_width,
						$product->part_height,
					),
					array_filter($products, fn(object $product) => $product->part_id !== null),
				), fn(object $part) => $part->get_id())
			),
			array_values( $grouped_products )
		);
	}
}