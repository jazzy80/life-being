<?php

// Interface for a abstract factory concerned with the production of UI elements.
interface AbstractViewFactory {
  public function create_header(): IView;
  public function create_left_pane(): IView;
  public function create_right_pane(): IView;
  public function create_vitality_menu(): IView;
  public function create_text_body(): IView; 
}
?>
