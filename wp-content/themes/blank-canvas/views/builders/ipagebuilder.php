<?php

namespace views\builders;

interface IPageBuilder
{
  public function add_page_component(\views\IView $component): IPageBuilder;

  public function build(): \views\IView;
}
