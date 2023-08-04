<?php

namespace Views\Builders;

use Views\CompositeView;
use Views\IView;

class PageBuilder implements IPageBuilder
{
  private array $components;

  public function add_page_component( IView $component): IPageBuilder
  {
    $this->components[] = $component;
    return $this;
  }

  public function build(): IView {
    return new CompositeView($this->components);
  }
}
