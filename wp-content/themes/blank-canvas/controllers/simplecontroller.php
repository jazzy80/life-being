<?php
class SimpleController extends BaseController {
  protected function get_view(): IView {
    $view_factory = $this -> get_view_factory();
    // Create the header view.
    return $view_factory -> create_body();
  }
}
?>
