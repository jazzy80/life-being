<?php
// Controller for rendering the Guest Book page.
class GuestBookController extends BaseController {
  public function create_view(): IView {
    return $this -> builder -> build_guestbook() -> get();
  }
}
