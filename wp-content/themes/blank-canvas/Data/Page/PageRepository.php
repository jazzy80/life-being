<?php

namespace Data\Page;

use Data\Conversion;
use Domain\Exceptions\ApplicationException;
use Domain\Models\Page;
use Domain\Repositories\IPageRepository;
use Utils\Utils;
use WP_Post;

class PageRepository implements IPageRepository
{
	/**
	 * @return Page|null
	 */
	public function get_current_page(): Page|null
	{
		$post = get_post();
		return $post ? Conversion::toDomain($post) : null;
	}

	/**
	 * @return array
	 */
	public function get_pages(): array {
		return array_map(fn(WP_Post $post) => Conversion::toDomain($post), get_pages());
	}

	/**
	 * @param Page $page
	 *
	 * @return Page
	 */
	public function get_page_root_parent(Page $page): Page
	{
		if ($page->get_post_parent() === 0) {
			return $page;
		}

		$parent_page = Conversion::toDomain(get_post($page->get_post_parent()));

		return $this->get_page_root_parent($parent_page);
	}

	/**
	 * Retrieve all top level menu items.
	 *
	 * @return array
	 *  Containing all top level menu items.
	 * @throws ApplicationException
	 *  Whenever there is not exactly one menu defined for this application.
	 *
	 * @throws ApplicationException
	 */
	public function get_nav_menu_items(): array
	{
		$nav_menus = wp_get_nav_menus();
		if (count($nav_menus) !== 1) {
			throw new ApplicationException("There should be exactly 1 menu defined.");
		}
		return wp_get_nav_menu_items($nav_menus[0]);
	}

	/**
	 * @param string $url
	 *
	 * @return WP_Post|null
	 */
	public function get_post_from_url(string $url): Page|null
	{
		$page = Utils::find_if(get_pages(), fn (WP_Post $page) => get_permalink($page) === $url);
		return $page ? Conversion::toDomain($page) : null;
	}
}
