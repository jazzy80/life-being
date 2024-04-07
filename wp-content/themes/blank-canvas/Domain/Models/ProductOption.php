<?php

namespace Domain\Models;

class ProductOption {
	private int $id;
	private string $name;
	private float $price;

	/**
	 * @param string $name
	 * @param float $price
	 * @param int $id
	 */
	public function __construct( int $id, string $name, float $price ) {
		$this->id = $id;
		$this->name  = $name;
		$this->price = $price;
	}

	public function get_id(): int {
		return $this->id;
	}

	public function get_name(): string {
		return $this->name;
	}

	public function get_price(): float {
		return $this->price;
	}

	public function to_json(): array {
		return [
			"id" => $this->id,
			"name" => $this->name,
			"price" => $this->price,
		];
	}
}