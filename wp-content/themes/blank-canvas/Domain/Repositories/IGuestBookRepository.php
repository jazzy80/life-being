<?php

namespace Domain\Repositories;

use Domain\Models\GuestBookEntry;

interface IGuestBookRepository {

	/**
	 * @return array<GuestBookEntry>
	 */
	function get_all_entries(): array;

	/**
	 * @param string $name
	 * @param string $text
	 *
	 * @return bool
	 */
	function create_guestbook_entry(string $name, string $text): bool;
}