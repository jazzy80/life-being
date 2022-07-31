<?php
require_once 'viewdecorator.php';

class RightPaneDecorator extends ViewDecorator implements IView {
  private string $class_attr;

  public function __construct(IView $view, string $class_attr) {
    parent :: __construct($view);
    $this -> class_attr = $class_attr;
  }

  public function display(): string {
    return '<div class="'. $this -> class_attr . '">' . $this -> view -> display() .
     '</div>';
  }
}
