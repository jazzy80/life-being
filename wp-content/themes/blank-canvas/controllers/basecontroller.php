<?php
abstract class BaseController {
  protected AbstractBuilder $builder;

  public function __construct(AbstractBuilder $builder) {
    $this -> builder = $builder;
  }

  public function get(): void {
    $view = $this -> create_view();
    echo $view -> display();
  }

  abstract protected function create_view(): IView;
}
?>
