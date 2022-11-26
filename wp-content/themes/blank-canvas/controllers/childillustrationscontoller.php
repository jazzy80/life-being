<?php
namespace controllers;
class ChildIllustrationsContoller extends BaseController {
  public function create_view(): \views\IView {
    return $this -> builder
                 -> build_child_illustrations($this -> page)
                 -> get();
  }
}
?>
