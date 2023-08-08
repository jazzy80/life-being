<?php

namespace Api;

use Domain\Repositories\IGuestBookRepository;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class Guestbook {

	private IGuestBookRepository $repository;

	/**
	 * @param IGuestBookRepository $repository
	 */
	public function __construct( IGuestBookRepository $repository ) {
		$this->repository = $repository;
	}

	public function create_guestbook_entry( WP_REST_Request $req ): WP_REST_Response|WP_Error {
		$body = json_decode( $req->get_body(), true );

		if (count(array_keys($body)) !== 2) {
			return new WP_Error(
				"Invalid Json", "Invalid amount of fields provided, expected 2.", [ "status" => "400" ] );
		}

		if ( ! array_key_exists( "name", $body ) || ! array_key_exists( "comment", $body ) ) {
			return new WP_Error(
				"Invalid Json.", "Keys for \"name\" or \"comment\" not provided.", [ "status" => "400" ] );
		}

		if ( empty( $body["name"] || empty( $body["comment"] ) ) ) {
			return new WP_Error(
				"Invalid Json.", "Json fields \"name\" or \"comment\" is empty.", [ "status" => "400" ] );
		}

		$name    = filter_var( $body["name"], FILTER_SANITIZE_STRING );
		$comment = filter_var( $body["comment"], FILTER_SANITIZE_STRING );
		$this->repository->create_guestbook_entry( $name, $comment );

		return new WP_REST_Response( null, 204 );
	}
}
