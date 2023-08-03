<?php

namespace Views\Services;

use Domain\Repositories\IPageRepository;
use Domain\Services\IPageService;
use Views\ViewModels\MenuItemViewModel;
use Utils\Utils;

class PageService implements IPageService {
	private IPageRepository $repository;

	public function __construct( IPageRepository $repository ) {
		$this->repository = $repository;
	}

	public function get_menu_items(): array {
		$menu_items                 = $this->repository->get_nav_menu_items();
		$root_menu_items            = array_filter( $menu_items, fn( $item ) => $item->menu_item_parent === "0" );
		$child_menu_items           = array_filter( $menu_items, fn( $item ) => $item->menu_item_parent !== "0" );
		$grouped_children_by_parent = Utils::group_by( $child_menu_items, fn( $child ) => $child->menu_item_parent );
		$current_url                = $this->repository->get_url_for_post( $this->repository->get_current_page() );

		function loop( array $menu_items, string $current_url, array $result, array $grouped_children_by_parent ): array {
			if ( count( $menu_items ) === 0 ) {
				return $result;
			}
			$head             = Utils::array_safe_head( $menu_items );
			$tail             = Utils::array_safe_tail( $menu_items );
			$child_menu_items = Utils::array_safe_get( $head->ID, $grouped_children_by_parent );
			$new_menu_item    = new MenuItemViewModel(
				$head->title,
				$head->url,
				$current_url === $head->url,
				$child_menu_items ? loop( $child_menu_items, $current_url, [], $grouped_children_by_parent ) : []
			);

			return loop( $tail, $current_url, [ ...$result, $new_menu_item ], $grouped_children_by_parent );
		}

		return loop( $root_menu_items, $current_url, [], $grouped_children_by_parent );
	}
}
