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
        );
    }
}
