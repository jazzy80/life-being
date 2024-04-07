<?php

namespace Domain\Services;

use Domain\Exceptions\ProductDoesNotExist;
use Domain\Models\Product;

interface IProductService {
	/**
	 * @throws ProductDoesNotExist
	 */
	function get_product(int $id): Product;
}