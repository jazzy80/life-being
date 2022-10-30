<?php
// Controller for rendering the Atelier page.
namespace controllers;
class AtelierGalleryController extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_atelier_gallery($this -> page)
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
