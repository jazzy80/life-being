<?php

namespace Domain\Models;

class Product {
	private int $id;

	private ?string $name;

	private ?string $description;

	private ?float $price;

	private ?string $image;

	private ?float $width;

	private ?float $height;

	private array $categories;

	private array $product_options;

	private array $parts;

	/**
	 * @param int $id
	 * @param string|null $name
	 * @param string|null $description
	 * @param float|null $price
	 * @param string|null $image
	 * @param float|null $width
	 * @param float|null $height
	 * @param array<Category> $categories
	 * @param array $product_options
	 * @param array $parts
	 */
	public function __construct(
		int $id, ?string $name, ?string $description, ?float $price, ?string $image,
		float|null $width, float|null $height, array $categories, array $product_options, array $parts
	) {
		$this->id              = $id;
		$this->name            = $name;
		$this->description     = $description;
		$this->price           = $price;
		$this->image           = $image;
		$this->width           = $width;
		$this->height          = $height;
		$this->categories      = $categories;
		$this->product_options = $product_options;
		$this->parts = $parts;
	}

	public function get_id(): int {
		return $this->id;
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

	public function get_width(): ?float {
		return $this->width;
	}

	public function get_height(): ?float {
		return $this->height;
	}

	public function get_categories(): array {
		return $this->categories;
	}

	public function get_product_options(): array {
		return $this->product_options;
	}

	public function get_parts(): array {
		return $this->parts;
	}

	public function to_json(): array {
		return [
			"id"              => $this->id,
			"name"            => $this->name,
			"description"     => $this->description,
			"price"           => $this->price,
			"image_url"       => $this->image,
			"width"           => $this->width,
			"height"          => $this->height,
			"categories"      => array_map( fn( Category $category ) => $category->to_json(),
				$this->categories
			),
			"product_options" => array_map( fn( ProductOption $option ) => $option->to_json(), $this->product_options ),
		];
	}
}