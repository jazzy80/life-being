<?php

namespace Data;

use Domain\Models\Page;
use WP_Post;

class Conversion
{
    public static function toDomain(WP_Post $post): Page
    {
        return new Page(
	        $post->ID,
	        $post->post_title,
	        $post->post_parent,
	        $post->post_excerpt,
	        $post->post_date,
	        get_permalink($post->ID),
	        get_the_post_thumbnail_url($post->ID),
        );
    }
}
