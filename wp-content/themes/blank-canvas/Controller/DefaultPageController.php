<?php

namespace Controller;

use Views\IView;
use Views\Builders\PageBuilder;
use Views\TextBodyView;

class DefaultPageController implements IController
{
    private PageBuilder $page_builder;

    public function __construct(PageBuilder $page_builder)
    {
        $this->page_builder = $page_builder;
    }

    public function handle(): IView
    {
        return $this->page_builder
            ->add_page_component(new TextBodyView)
            ->build();
    }
}
