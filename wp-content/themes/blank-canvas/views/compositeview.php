<?php

require_once "iview.php";

/**
* Class representing a View that consists of other views.
* Conceptually, this datastructure is a tree in which the nodes represents CompositeViews
* and the leaves the actually singular views.
**/
class CompositeView implements IView {
  // This node's subtree is represented by an array of views.
  private array $views;

  public function __construct(array $views) {
    $this -> views = $views;
  }

  public function display(): string {
    // Display is implemented by calling display recursively of all subtree nodes.
    return array_reduce(
      $this -> views,
      fn(string $page, IView $view) =>
        $page . $view -> display(),
      '');
  }
}
?>
