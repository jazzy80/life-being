<?php
// Controller for rendering the Home page.
class HomeController extends BaseController {
  protected function create_view(): IView {
    return $this -> builder -> build_text_body() -> get();
  }
}
?>
