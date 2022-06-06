<?php
function get_articles($data, $article_page) {
$page_number = intval(filter_var($data['page'], FILTER_SANITIZE_STRING));
$articles = find_child_pages_of_parent($article_page);
$paginated_articles = array_slice($articles, $page_number * PAGINATION_SIZE, PAGINATION_SIZE);
return [
  'count' => sizeof($articles),
  'blogs' => array_reduce($paginated_articles, function($acc, $article) {
    $acc[] = [
      'title' => filter_var($article -> post_title, FILTER_SANITIZE_STRING),
      'date' => date_format(date_create(filter_var($article-> post_date, FILTER_SANITIZE_STRING)), 'd-M-Y'),
      'excerpt' => filter_var($article-> post_excerpt, FILTER_SANITIZE_STRING),
      'url' => filter_var(get_permalink($article), FILTER_SANITIZE_URL),
      'featured_image_url' => filter_var(get_the_post_thumbnail_url($article), FILTER_SANITIZE_URL)
    ];
    return $acc;
  }, [])
];
}
 ?>
