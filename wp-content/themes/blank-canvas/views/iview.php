<?php
/**
* IView is a representation of the UI elements.
**/
namespace views;

interface IView {
  /**
  * Returns a string representation of the IView for display.
  **/
  public function display(): string;
}
