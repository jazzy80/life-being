<?php
interface IView {
  /**
  * Returns a string representation of a IView which can be displayed.
  **/
  public function display(): string;
}
?>
