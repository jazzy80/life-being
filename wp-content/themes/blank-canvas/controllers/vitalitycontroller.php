<?php
class VitalityController extends BaseController {
  protected function create_view(): IView {
    return $this -> builder
                 -> build_vitality()
                 -> build_text_body()
                 -> build_right_pane() 
                 -> get();
  }
}
?>
