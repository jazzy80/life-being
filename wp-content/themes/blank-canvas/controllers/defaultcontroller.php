<?php
// Default controller, for the default wordpress pages.
namespace controllers;
class DefaultController extends BaseController {
  protected function create_view(): \views\IView {
    return $this -> builder
                 -> build_text_body()
                 -> build_right_pane()
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
