<?php
namespace controllers;
class BigDreamsController extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_bigdreams($this -> page)
                 -> get();
  }
}
?>
