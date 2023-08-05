<?php

namespace Controller;

use \Views\IView;

interface IController
{
    function handle(): IView;
}
