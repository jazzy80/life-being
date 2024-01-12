<?php

namespace Views\Services;

use Domain\Exceptions\ProductDoesNotExist;
use Domain\Models\Product;
use Domain\Repositories\IProductRepository;
use Domain\Services\IProductService;
use Utils\Utils;

class ProductService implements IProductService {

	private IProductRepository $repository;

	/**
	 * @param IProductRepository $repository
	 */
	public function __construct( IProductRepository $repository ) {
		$this->repository = $repository;
	}

	/**
	 * @throws ProductDoesNotExist
	 */
	function get_product( int $id ): Product {
		$product = Utils::find_if(
			$this->repository->get_products(),
		fn(Product $product) => $product->get_id() === $id
		);
		if ($product === null) {
			throw new ProductDoesNotExist("Could not find product with id: $id.", "");
		}
		return $product;
	}
}