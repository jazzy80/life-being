<?php

namespace Data\GuestBook;

use Domain\Models\GuestBookEntry;
use Domain\Repositories\IGuestBookRepository;
use wpdb;


class GuestBookRepository implements IGuestBookRepository {
	private wpdb $db_client;

	/**
	 * @param wpdb $db_client
	 */
	public function __construct( wpdb $db_client ) {
		$this->db_client = $db_client;
	}

	/**
	 * @return array<GuestBookEntry>
	 */
	function get_all_entries(): array {
		$entries = $this->db_client->get_results(
			'SELECT name, created_on, text_body FROM wp_guestbook ORDER BY created_on DESC LIMIT 15',
		);

		return array_map(
			fn( object $entry ): GuestBookEntry => new GuestBookEntry(
				$entry->name,
				date_create($entry->created_on),
				$entry->text_body
			),
			$entries
		);
	}

	/**
	 * @param string $name
	 * @param string $text
	 *
	 * @return bool
	 */
	public function create_guestbook_entry( string $name, string $text ): bool{
		return $this->db_client->query( $this->db_client->prepare(
			'INSERT INTO wp_guestbook (name, text_body) VALUES (%s, %s)',
			array( $name, $text )
		) );
	}
}