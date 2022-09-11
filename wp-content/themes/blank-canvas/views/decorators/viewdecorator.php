<?php
namespace views\decorators;
/**
* Class representing a decorator to give views additonal properties at runtime.
**/
abstract class ViewDecorator implements \views\IView {
  protected \views\IView $view;

  public function __construct(\views\IView $view) {
    $this -> view = $view;
  }
}
?>
