<?php

namespace Views\ViewModels;

class MenuItemsViewModel
{
    private array $menu_items;

    public function __construct(array $menu_items)
    {
        $this->menu_items = $menu_items;
    }


	/**
	 * @return array<MenuItemViewModel>
	 */
	public function get_menu_items(): array {
		return $this -> menu_items;
	}
}
