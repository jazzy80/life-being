<?php

namespace domain\repositories;

interface IPageRepository
{
    public function get_current_page(): \WP_Post;

    public function get_page_root_parent(\WP_Post $page): \WP_Post;

    public function get_nav_menu_items(): array;

    public function get_url_for_post(\WP_Post $page): string;
}
