<?php

namespace Domain\Models;

class Page
{
    private int $id;
    private string $title;
    private int $post_parent;

	private string $excerpt;

	private string $date;

	private string $url;

	private string $featured_image_url;

    public function __construct( int $id, string $title, int $post_parent, string $excerpt, string $date, string $url, string $featured_image_url )
    {
        $this->id = $id;
        $this->title = $title;
        $this->post_parent = $post_parent;
	    $this->excerpt = $excerpt;
	    $this->date = $date;
	    $this->url = $url;
	    $this->featured_image_url = $featured_image_url;
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

	public function get_excerpt(): string {
		return $this->excerpt;
	}

	public function get_date(): string {
		return $this->date;
	}

	public function get_url(): string {
		return $this->url;
	}

	public function get_featured_image_url(): string {
		return $this->featured_image_url;
	}
}
