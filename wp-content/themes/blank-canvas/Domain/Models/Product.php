<?php

namespace Domain\Models;

use Serializable;

class Product {
	private ?string $name;

	private ?string $description;

	private ?float $price;

	private ?string $image;

	private ?string $detail_text;

	private array $categories;

	/**
	 * @param string|null $name
	 * @param string|null $description
	 * @param float|null $price
	 * @param string|null $image
	 * @param string|null $detail_text
	 * @param array<Category> $categories
	 */
	public function __construct(
		?string $name, ?string $description, ?float $price, ?string $image,
		?string $detail_text, array $categories
	) {
		$this->name        = $name;
		$this->description = $description;
		$this->price       = $price;
		$this->image       = $image;
		$this->detail_text = $detail_text;
		$this->categories  = $categories;
	}

	public function get_name(): ?string {
		return $this->name;
	}

	public function get_description(): ?string {
		return $this->description;
	}

	public function get_price(): ?float {
		return $this->price;
	}

	public function get_image(): ?string {
		return $this->image;
	}

	public function get_detail_text(): ?string {
		return $this->detail_text;
	}

	public function get_categories(): array {
		return $this->categories;
	}

	public function to_json(): array {
		return [
			"name"=> $this->name,
			"description"=> $this->description,
			"price"=> $this->price,
			"image_url"=> $this->image,
			"detail_text"=>$this->detail_text,
			"categories"=> array_map(fn(Category $category) => $category->to_json(),
				$this->categories
			),
		];
	}
}