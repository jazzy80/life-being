<?php
interface AbstractBuilder {
  public function build_header(): AbstractBuilder;
  public function build_left_pane(): AbstractBuilder;
  public function build_right_pane(): AbstractBuilder;
  public function build_text_body(): AbstractBuilder;
  public function build_vitality(): AbstractBuilder;
  public function get(): IView;
}
?>
