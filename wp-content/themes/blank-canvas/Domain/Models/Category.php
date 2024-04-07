<?php

namespace Domain\Models;

class Category {
	private string $name;

	private string $description;

	private string $slug;

	/**
	 * @param string $name
	 * @param string $slug
	 * @param string $description
	 */
	public function __construct( string $name, string $slug, string $description ) {
		$this->name = $name;
		$this->slug = $slug;
		$this->description = $description;
	}

	public function get_name(): string {
		return $this->name;
	}

	public function get_slug(): string {
		return $this->slug;
	}

	public function get_description(): string {
		return $this->description;
	}

	public function to_json(): array {
		return [
			"name" => $this->name,
			"slug" => $this->slug,
			"description" => $this->description,
		];
	}
}