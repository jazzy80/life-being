<?php

namespace Controller;

use \Views\IView;
use \Views\TextBodyView;

class HomeController implements IController
{
    public function handle(): IView
    {
        return new TextBodyView();
    }
}
