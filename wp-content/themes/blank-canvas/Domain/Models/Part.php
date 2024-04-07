<?php

namespace Domain\Models;

class Part {
	private int $id;

	private string $part_name;

	private string $part_description;

	private ?float $width;

	private ?float $height;

	/**
	 * @param int $id
	 * @param string $part_name
	 * @param string $part_description
	 * @param float|null $width
	 * @param float|null $height
	 */
	public function __construct(
		int $id,
		string $part_name,
		string $part_description,
		?float $width,
		?float $height
	) {
		$this->part_name        = $part_name;
		$this->part_description = $part_description;
		$this->width            = $width;
		$this->height           = $height;
		$this->id = $id;
	}

	public function get_id(): int {
		return $this->id;
	}

	public function get_part_name(): string {
		return $this->part_name;
	}

	public function get_part_description(): string {
		return $this->part_description;
	}

	public function get_width(): ?float {
		return $this->width;
	}

	public function get_height(): ?float {
		return $this->height;
	}

	public function as_html(): string {
		return $this->part_name . ":<br>" . $this->part_description . "<br>(" . $this->width . "cm x " . $this->height . "cm)";
	}
}