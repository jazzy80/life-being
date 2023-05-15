<?php

// Interface for a abstract factory concerned with the production of UI elements.
namespace views\factories;
interface AbstractViewFactory {
  public function create_header(\utils\Maybe $header_title, \utils\Maybe $header_subtitle): \views\IView;
  public function create_left_pane(): \views\IView;
  public function create_right_pane(): \views\IView;
  public function create_text_body(): \views\IView;
}
?>
