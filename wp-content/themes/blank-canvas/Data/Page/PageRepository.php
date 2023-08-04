<?php

namespace Data\Page;

use Domain\Repositories\IPageRepository;
use Utils\Utils;
use WP_Post;

class PageRepository implements IPageRepository {
	public function get_current_page(): WP_Post {
		return get_post();
	}

	public function get_page_root_parent( WP_Post $page ): \WP_Post {
		if ( $page->post_parent === 0 ) {
			return $page;
		}

		return $this->get_page_root_parent( get_post( $page->post_parent ) );
	}

	public function get_url_for_post( WP_Post $page ): string {
		return get_permalink( $page );
	}

	public function get_featured_image( WP_Post $page ): string|null {
		return get_the_post_thumbnail_url( $page, 'large' ) ?: null;
	}

	/**
	 * Retrieve all top level menu items.
	 *
	 * @return array
	 *  Containing all top level menu items.
	 */
	public function get_nav_menu_items(): array {
		return wp_get_nav_menu_items( wp_get_nav_menus()[0] );
	}

	/**
	 * @param string $url
	 *
	 * @return WP_Post|null
	 */
	public function get_post_from_url( string $url ): WP_Post|null {
		return Utils::find_if(get_posts(), fn(WP_Post $post) => get_permalink($post) === $url);
	}
}
