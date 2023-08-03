<?php

namespace views\services;

use \domain\repositories\IPageRepository;
use \domain\services\IPageService;
use \views\viewmodels\MenuItemViewModel;

class PageService implements IPageService
{
    private IPageRepository $repository;

    public function __construct(IPageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function get_menu_items(): array
    {
        $root_page = $this->repository->get_page_root_parent(
            $this->repository->get_current_page()
        );
        $root_page_url = $this->repository->get_url_for_post($root_page);

        $menu_items = $this->repository->get_nav_menu_items();
        $root_menu_items = array_filter($menu_items, fn ($item) => $item->menu_item_parent === "0");
        $child_menu_items = array_filter($menu_items, fn ($item) => $item->menu_item_parent !== "0");

        $grouped_childs_by_parent = group_by($child_menu_items, fn ($child) => $child->menu_item_parent);

        function loop(array $menu_items, array $result, array $grouped_childs_by_parent): array
        {
            if (count($menu_items) === 0) {
                return $result;
            }
            $head = array_safe_head($menu_items);
            $tail = array_safe_tail($menu_items);
            $child_menu_items = array_safe_get($head->ID, $grouped_childs_by_parent);
            $new_menu_item = new MenuItemViewModel(
                $head->name,
                $head->url,
                true,
                $child_menu_items ? loop($child_menu_items, [], $grouped_childs_by_parent) : []
            );
            return loop($tail, [...$result, $new_menu_item], $grouped_childs_by_parent);
        }

        return loop($root_menu_items, [], $grouped_childs_by_parent);
    }
}
