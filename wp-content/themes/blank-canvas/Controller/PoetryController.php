<?php

namespace Controller;

use Views\IView;
use Views\Builders\PageBuilder;
use Views\JsFilesView;
use Views\TextBodyView;

class PoetryController implements IController
{
    private PageBuilder $page_builder;

    public function __construct(PageBuilder $page_builder)
    {
        $this->page_builder = $page_builder;
    }

    public function handle(): IView
    {
        return $this->page_builder
            ->add_page_component(new JsFilesView(["/scripts/dist/poetrymain.js"]))
            ->add_page_component(new TextBodyView)
            ->build();
    }
}
