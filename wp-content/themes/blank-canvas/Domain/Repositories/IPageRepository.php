<?php

namespace Domain\Repositories;

use Domain\Models\Page;


interface IPageRepository
{
    public function get_current_page(): Page|null;

    public function get_page_root_parent(Page $page): Page;

    public function get_nav_menu_items(): array;

    public function get_url_for_post(Page $page): string;

    public function get_featured_image(Page $page): string|null;

    public function get_post_from_url(string $url): Page|null;
}
