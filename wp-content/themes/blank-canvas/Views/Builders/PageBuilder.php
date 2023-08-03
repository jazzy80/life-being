<?php

namespace Views\Builders;

class PageBuilder implements IPageBuilder
{
  private array $components = [];

  public function add_page_component(\Views\IView $component): IPageBuilder
  {
    array_push($this->components, $component);
    return $this;
  }

  public function build(): \Views\IView
  {
    return new \Views\CompositeView($this->components);
  }
}
