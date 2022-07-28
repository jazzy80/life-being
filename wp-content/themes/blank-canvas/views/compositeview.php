<?php

require_once "iview.php";

/**
* Class representing a View that consists of other views.
**/
class CompositeView implements IView {
  public function __construct(array $views, string $class_attr) {
    $this -> views = $views;
    $this -> class_attr = $class_attr;
  }

  public function display(): string {
    // Display is implemented by calling the display of all child views.
    return array_reduce(
      $this -> views,
      fn(string $page, IView $view) =>
        $page . $view -> display(),
      '<div class="' . $this -> class_attr . '">') . '</div>';
  }
}
 ?>
