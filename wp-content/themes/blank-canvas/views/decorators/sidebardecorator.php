<?php

namespace views\decorators;
class SideBarDecorator extends ViewDecorator implements \views\IView {
  private string $class_attr;

  public function __construct(\views\IView $view, string $class_attr) {
    parent :: __construct($view);
    $this -> class_attr = $class_attr;
  }

  public function display(): string {
    return '<div class="'. $this -> class_attr . '">' . $this -> view -> display() .
     '</div>';
  }
}
