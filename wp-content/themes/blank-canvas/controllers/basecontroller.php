<?php
/*
* Abstract class for controllers, these object are responsible for the flow between
* data and the UI.
*/
namespace controllers;
abstract class BaseController {
  protected \views\builders\AbstractBuilder $builder;
  protected \serviceproviders\ModelProvider $provider;
  protected \WP_Post $page;

  public function __construct(
    \views\builders\AbstractBuilder $builder,
    \serviceproviders\ModelProvider $provider
  ) {
    // Builder is used to generate the specific views.
    $this -> builder = $builder;
    $this -> provider = $provider;
    $this -> page = $provider -> get_page_model() -> get_current_page();
  }

  // Get Function to create the UI.
  public function get(): void {
    $view = $this -> create_view();
    echo $view -> display();
  }

  // Function to create the specific View to render.
  abstract protected function create_view(): \views\IView;
}
?>
