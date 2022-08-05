<?php

require_once "iview.php";

/**
* Class representing a View that consists of other views.
**/
class CompositeView implements IView {
  private array $views;

  public function __construct(array $views) {
    $this -> views = $views;
  }

  public function display(): string {
    // Display is implemented by calling the display of all child views.
    return array_reduce(
      $this -> views,
      fn(string $page, IView $view) =>
        $page . $view -> display(),
      '');
  }
}
?>
