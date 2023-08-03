<?php

namespace views;

use views\viewmodels\MenuItemsViewModel;

class UpperNavBarView implements IView
{
  private MenuItemsViewModel $menu_items;

  public function __construct(MenuItemsViewModel $menu_items)
  {
    $this->menu_items = $menu_items;
  }

  public function display(): string
  {
    $navbar_links = array_reduce(
      $this->menu_items->menu_items,
      function (string $html_page, \views\viewmodels\MenuItemViewModel $menu_item) {
        $tag_name = $menu_item->url === '#' || $menu_item->url === '' ? 'span' : 'a';
        if (!array_safe_get($menu_item->ID, $grouped_childs_by_parent)) {
          return $html_page .
            '<li>
                       <a ' . ($this->page_repository->get_url_for_post($root_page) === $menu_item->url
              ? 'class="active-link"' : '') .  'href="' . $menu_item->url . '">' .
            $menu_item->title .
            '</a>
                    </li>';
        }
        return
          $html_page . '<div class="dropdown">' .
          '<li><' . $tag_name . ' href="#" class="link-like dropbtn">' . $menu_item->title
          . '</' . $tag_name . '></li>' .
          '<div class="dropdown-content">' .
          $this->get_child_menu_items_html($grouped_childs_by_parent, $menu_item) .
          '</div>
                </div>';
      },
      ''
    );

    return <<< EOL
      <ul class="nav-links upper-navbar-links">
        <li>
          <a href="/">Be Home</a></li>
          $navbar_links
       </ul>
    EOL;
  }

  private function get_child_menu_items_html($grouped_menu_items, $parent_item): string
  {
    return implode(
      " ",
      array_map(
        fn ($menu_item) => '<a href="' . $menu_item->url . '">' . $menu_item->title . '</a>',
        $grouped_menu_items[$parent_item->ID]
      )
    );
  }
}
