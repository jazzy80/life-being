<?php

namespace Views;

use Views\ViewModels\MenuItemsViewModel;

class UpperNavBarView implements IView {
	private MenuItemsViewModel $menu_items;

	public function __construct( MenuItemsViewModel $menu_items ) {
		$this->menu_items = $menu_items;
	}

	public function display(): string {
		$navbar_links = array_map(fn($menu_item) => $menu_item->to_html(), $this->menu_items->get_menu_items());
		$navbar_as_html = join("", $navbar_links);

		return <<< EOL
      <ul class="nav-links upper-navbar-links">
        <li><a href="/">Be Home</a></li>
        	$navbar_as_html
       </ul>
    EOL;
	}
}
