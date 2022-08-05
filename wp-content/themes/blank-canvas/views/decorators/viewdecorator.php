<?php
/**
* Class representing a decorator to give views additonal properties at runtime.
**/
abstract class ViewDecorator implements IView {
  protected IView $view;

  public function __construct(IView $view) {
    $this -> view = $view;
  }
}
?>
