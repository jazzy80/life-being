<?php

namespace Api;

use Domain\Models\Category;
use Domain\Repositories\IProductRepository;
use WP_REST_Request;

class Product {

	private IProductRepository $repository;

	/**
	 * @param IProductRepository $repository
	 */
	public function __construct( IProductRepository $repository ) {
		$this->repository = $repository;
	}

	/**
	 * @return array<Product>
	 */
	public function get_products( WP_REST_Request $req ): array {
		$category_param = $req->get_query_params()['category'];
		$page     = $req->get_query_params()['page'];
		$products = $this->repository->get_products();

		$filtered_products = $category_param ?
			array_filter(
				$products,
				fn( \Domain\Models\Product $product ) => in_array(
					$category_param,
					array_map( fn( Category $category ) => $category->get_slug(), $product->get_categories() ),
					true
				)
			) : $products;

		$serialized_products = array_map(
			fn(\Domain\Models\Product $product) => $product->to_json(),
			$filtered_products
		);

		return [
			'count'          => sizeof( $filtered_products ),
			'paginationSize' => PRODUCTS_PAGINATION_SIZE,
			'products'       => $page != null ? array_slice(
				$serialized_products, $page * PRODUCTS_PAGINATION_SIZE,
				PRODUCTS_PAGINATION_SIZE
			) : $serialized_products
		];
	}
}