<?php

namespace Data;

use \WP_Post;
use Domain\Models\Page;

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
