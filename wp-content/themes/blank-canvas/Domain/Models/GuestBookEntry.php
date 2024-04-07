<?php

namespace Domain\Models;

use DateTimeInterface;

class GuestBookEntry {

	private string $name;
	private DateTimeInterface $created_on;
	private string $comment;

	/**
	 * @param string $name
	 * @param DateTimeInterface $created_on
	 * @param string $comment
	 */
	public function __construct( string $name, DateTimeInterface $created_on, string $comment ) {
		$this->name       = $name;
		$this->created_on = $created_on;
		$this->comment  = $comment;
	}

	public function get_name(): string {
		return $this->name;
	}

	public function get_created_on(): DateTimeInterface{
		return $this->created_on;
	}

	public function get_comment(): string {
		return $this->comment;
	}
}