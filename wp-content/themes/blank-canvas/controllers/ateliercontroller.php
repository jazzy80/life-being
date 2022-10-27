<?php
// Controller for rendering the Atelier page.
namespace controllers;
class AtelierController extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_atelier($this -> page)
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
