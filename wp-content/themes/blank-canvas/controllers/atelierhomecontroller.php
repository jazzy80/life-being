<?php
// Controller for rendering the Atelier page.
namespace controllers;
class AtelierHomeController extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_atelier_home($this -> page)
                 -> get();
  }
}
?>
