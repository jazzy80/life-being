<?php

namespace views;

class UpperNavBarView implements IView
{
    private \models\PageModel $page_model;
    private array $menu_items;

    public function __construct(\models\PageModel $page_model, array $menu_items)
    {
        $this->page_model = $page_model;
        $this->menu_items = $menu_items;
    }

    private function get_child_menu_items_html($grouped_menu_items, $parent_item): string
    {
        return implode(
            " ",
            array_map(
                fn($menu_item) => '<a href="' . $menu_item->url . '">' . $menu_item->title . '</a>',
                $grouped_menu_items[$parent_item->ID]
            )
        );
    }

    public function display(): string
    {
        $root_page = $this->page_model->get_page_root_parent(
            $this->page_model->get_current_page()
        );

        $root_menu_items = array_filter($this->menu_items, fn($item) => $item->menu_item_parent === "0");
        $child_menu_items = array_filter($this->menu_items, fn($item) => $item->menu_item_parent !== "0");
        $grouped_childs_by_parent = group_by($child_menu_items, fn($child) => $child->menu_item_parent);

        $navbar_links = array_reduce(
            $root_menu_items,
            function (string $html_page, \WP_Post $menu_item) use ($root_page, $grouped_childs_by_parent) {
                $tag_name = $menu_item -> url === '#' || $menu_item->url === '' ? 'span' : 'a';
                if ($grouped_childs_by_parent[$menu_item->ID] === null) {
                    return $html_page .
                    '<li>
                       <a ' . ($this->page_model->get_url_for_post($root_page) === $menu_item->url
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
}
