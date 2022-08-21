<?php
// Default controller, for the default wordpress pages.
class DefaultController extends BaseController {
  protected function create_view(): IView {
    return $this -> builder
                 -> build_left_pane()
                 -> build_text_body()
                 -> build_right_pane()
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
