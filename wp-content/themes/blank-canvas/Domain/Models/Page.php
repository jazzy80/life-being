<?php

namespace Domain\Models;

class Page
{
    private int $id;
    private string $title;
    private int $post_parent;

    public function __construct(int $id, string $title, int $post_parent)
    {
        $this->id = $id;
        $this->title = $title;
        $this->post_parent = $post_parent;
    }

    public function get_id(): int
    {
        return $this->id;
    }

    public function get_title(): string
    {
        return $this->title;
    }

    public function get_post_parent(): int
    {
        return $this->post_parent;
    }
}
