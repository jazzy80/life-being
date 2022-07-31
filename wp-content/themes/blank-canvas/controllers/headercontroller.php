<?php
class HeaderController extends BaseController {
  protected function get_view(): IView {
    // init viewfactory.
    $view_factory = $this -> get_view_factory();
    // Create the header view.
    return $view_factory -> create_header();
  }
}
?>
