<?php

namespace views\builders;

class PageBuilder implements IPageBuilder
{
  private array $components = [];

  public function add_page_component(\views\IView $component): IPageBuilder
  {
    array_push($this->components, $component);
    return $this;
  }

  public function build(): \views\IView
  {
    return new \views\CompositeView($this->components);
  }
}
