<?php

namespace Controller;

use \Views\IView;

interface IController
{
    public function handle(): IView;
}
