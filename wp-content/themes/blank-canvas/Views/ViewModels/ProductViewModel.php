<?php

namespace Views\ViewModels;

use Domain\Models\ProductOption;

class ProductViewModel {
	private int $id;
	private string $name;
	private string $description;
	private float $price;
	private ?string $image_url;
	private ?float $width;
	private ?float $height;
	private array $categories;
	private array $product_options;
	private array $parts;

	/**
	 * @param int $id
	 * @param string $name
	 * @param string $description
	 * @param float $price
	 * @param string|null $image_url
	 * @param float|null $width
	 * @param float|null $height
	 * @param array $categories
	 * @param array $product_options
	 * @param array $parts
	 */
	public function __construct(
		int $id,
		string $name,
		string $description,
		float $price,
		?string $image_url,
		?float $width,
		?float $height,
		array $categories,
		array $product_options, array $parts,
	) {
		$this->id              = $id;
		$this->name            = $name;
		$this->description     = $description;
		$this->price           = $price;
		$this->image_url       = $image_url;
		$this->width           = $width;
		$this->height          = $height;
		$this->categories      = $categories;
		$this->product_options = $product_options;
		$this->parts = $parts;
	}

	public
	function get_id(): int {
		return $this->id;
	}

	public
	function get_name(): string {
		return $this->name;
	}

	public
	function get_description(): string {
		return $this->description;
	}

	public
	function get_price(): float {
		return $this->price;
	}

	public
	function get_image_url(): ?string {
		return $this->image_url;
	}

	public
	function get_categories(): array {
		return $this->categories;
	}

	public
	function get_product_options(): array {
		return $this->product_options;
	}

	public function get_width(): ?float {
		return $this->width;
	}

	public function get_height(): ?float {
		return $this->height;
	}

	public function get_parts(): array {
		return $this->parts;
	}

	public function product_options_as_html(): string {
		return join(
			"",
			array_map(
				fn( ProductOption $option ) => "<div>{$option->get_name()}
					<input type=\"checkbox\" name=\"id\" value=\"{$option->get_id()}\"></div>",
				$this->product_options
			)
		);
	}
}