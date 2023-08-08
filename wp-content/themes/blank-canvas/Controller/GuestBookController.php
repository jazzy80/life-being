<?php

namespace Controller;

use Domain\Models\GuestBookEntry;
use Domain\Repositories\IGuestBookRepository;
use Views\Builders\IPageBuilder;
use Views\GuestBookView;
use Views\IView;
use Views\JsFilesView;

class GuestBookController implements IController {

	private IPageBuilder $builder;
	private IGuestBookRepository $guest_book_repository;

	/**
	 * @param IPageBuilder $builder
	 * @param IGuestBookRepository $guest_book_repository
	 */
	public function __construct( IPageBuilder $builder, IGuestBookRepository $guest_book_repository, ) {
		$this->builder = $builder;
		$this->guest_book_repository = $guest_book_repository;
	}

	public function handle(): IView {
		return $this->builder
			->add_page_component(new GuestBookView($this->guest_book_repository->get_all_entries()))
			->add_page_component(new JsFilesView(["/scripts/dist/guestbookmain.js"]))
			->build();
	}
}