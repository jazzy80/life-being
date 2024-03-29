<?php
// Controller for rendering the Guest Book page.
namespace controllers;
class GuestBookController extends BaseController {
  public function create_view(): \views\IView {
    $guest_book_entries = $this -> provider
                                -> get_guestbook_model()
                                -> get_all_entries();
    return $this -> builder
                 -> build_guestbook($guest_book_entries)
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
