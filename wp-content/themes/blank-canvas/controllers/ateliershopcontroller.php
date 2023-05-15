<?php
// Controller for rendering the Atelier page.
namespace controllers;
class AtelierShopController extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_atelier_shop($this -> page)
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
