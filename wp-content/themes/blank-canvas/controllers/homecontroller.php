<?php
// Controller for rendering the Home page.
namespace controllers;
class HomeController extends BaseController {
  protected function create_view(): \views\IView {
    return $this -> builder
                 -> build_text_body()
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
