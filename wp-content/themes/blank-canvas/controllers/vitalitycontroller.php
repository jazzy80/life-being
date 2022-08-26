<?php
// Controller for pages needing the Vitality menu.
namespace controllers;
class VitalityController extends BaseController {
  protected function create_view(): IView {
    return $this -> builder
                 -> build_vitality()
                 -> build_text_body()
                 -> build_right_pane()
                 -> build_jsfiles($this -> page)
                 -> get();
  }
}
?>
