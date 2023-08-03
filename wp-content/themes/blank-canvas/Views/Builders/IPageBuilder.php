<?php

namespace Views\Builders;

interface IPageBuilder
{
  public function add_page_component(\Views\IView $component): IPageBuilder;

  public function build(): \Views\IView;
}
