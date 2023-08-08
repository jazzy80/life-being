<?php

namespace Domain\Models;

use DateTimeInterface;

class GuestBookEntry {

	private string $name;
	private DateTimeInterface $created_on;
	private string $text_body;

	/**
	 * @param string $name
	 * @param DateTimeInterface $created_on
	 * @param string $text_body
	 */
	public function __construct( string $name, DateTimeInterface $created_on, string $text_body ) {
		$this->name       = $name;
		$this->created_on = $created_on;
		$this->text_body  = $text_body;
	}

	public function get_name(): string {
		return $this->name;
	}

	public function get_created_on(): DateTimeInterface{
		return $this->created_on;
	}

	public function get_text_body(): string {
		return $this->text_body;
	}
}