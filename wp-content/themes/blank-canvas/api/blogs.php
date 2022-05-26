<?php
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/', '/blogs/(?P<page>\d+)/', array(
    'methods' => 'GET',
    'callback' => 'get_blogs',
  ) );
} );

function get_blogs ($data) {
  // Get the page number, start with 0.
  $page_number = intval($data['page']);
  $blog_page = get_page_from_title(BLOG_PAGE);
  $blogs = find_child_pages_of_parent($blog_page);
  $paginated_blogs = array_slice($blogs, $page_number * PAGINATION_SIZE, PAGINATION_SIZE);
  return [
    'count' => sizeof($blogs),
    'blogs' => array_reduce($paginated_blogs, function($acc, $blog) {
      $acc[] = [
        'title' => $blog -> post_title,
        'date' => date_format(date_create($blog -> post_date), 'd-M-Y'),
        'excerpt' => $blog -> post_excerpt,
        'url' => get_permalink($blog),
        'featured_image_url' => get_the_post_thumbnail_url($blog)
      ];
      return $acc;
    }, [])
  ];
}
?>
