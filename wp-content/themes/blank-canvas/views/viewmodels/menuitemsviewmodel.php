<?php

namespace views\viewmodels;

class MenuItemsViewModel
{
    public array $menu_items;

    public function __construct(array $menu_items)
    {
        $this->menu_items = $menu_items;
    }
}
