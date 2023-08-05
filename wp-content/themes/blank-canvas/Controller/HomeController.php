<?php

namespace Controller;

use Views\Builders\IPageBuilder;
use \Views\IView;

class HomeController extends IController
{
    private IPageBuilder $builder;

    public function __construct(IPageBuilder $builder)
    {
        $this->builder = $builder;
    }

    public function handle(): IView
    {
    }
}
