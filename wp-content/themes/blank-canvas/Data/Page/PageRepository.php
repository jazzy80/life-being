<?php

namespace Data\Page;

use Data\Conversion;
use Domain\Models\Page;
use Domain\Repositories\IPageRepository;
use Utils\Utils;

use \WP_Post;

class PageRepository implements IPageRepository
{
	public function get_current_page(): Page|null
	{
		return Conversion::toDomain(get_post());
	}

	public function get_page_root_parent(Page $page): Page
	{
		if ($page->get_post_parent() === 0) {
			return $page;
		}

		$parent_page = Conversion::toDomain(get_post($page->get_post_parent()));

		return $this->get_page_root_parent($parent_page);
	}

	public function get_url_for_post(Page $page): string
	{
		return get_permalink($page);
	}

	public function get_featured_image(Page $page): string|null
	{
		return get_the_post_thumbnail_url($page, 'large') ?: null;
	}

	/**
	 * Retrieve all top level menu items.
	 *
	 * @return array
	 *  Containing all top level menu items.
	 */
	public function get_nav_menu_items(): array
	{
		return wp_get_nav_menu_items(wp_get_nav_menus()[0]);
	}

	/**
	 * @param string $url
	 *
	 * @return WP_Post|null
	 */
	public function get_post_from_url(string $url): Page|null
	{
		$page = Utils::find_if(get_pages(), fn (WP_Post $page) => get_permalink($page) === $url);
		return $page ?? Conversion::toDomain($page);
	}
}
