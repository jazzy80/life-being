<?php
/*
* Abstract class for controllers, these object are responsible for the flow between
* data and the UI.
*/
abstract class BaseController {
  protected AbstractBuilder $builder;

  public function __construct(AbstractBuilder $builder) {
    // Builder is used to generate the specific views.
    $this -> builder = $builder;
  }

  // Get Function to create the UI.
  public function get(): void {
    $view = $this -> create_view();
    echo $view -> display();
  }

  // Function to create the specific View to render.
  abstract protected function create_view(): IView;
}
?>
