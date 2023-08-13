<?php

namespace Domain\Repositories;

use Domain\Models\Product;

interface IProductRepository {
	/**
	 * @return array<Product>
	 */
	function get_products(): array;
}