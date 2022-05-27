<?php
function get_articles($data, $article_page) {
$page_number = intval($data['page']);
$articles = find_child_pages_of_parent($article_page);
$paginated_articles = array_slice($articles, $page_number * PAGINATION_SIZE, PAGINATION_SIZE);
return [
  'count' => sizeof($articles),
  'blogs' => array_reduce($paginated_articles, function($acc, $article) {
    $acc[] = [
      'title' => $article -> post_title,
      'date' => date_format(date_create($article-> post_date), 'd-M-Y'),
      'excerpt' => $article-> post_excerpt,
      'url' => get_permalink($article),
      'featured_image_url' => get_the_post_thumbnail_url($article)
    ];
    return $acc;
  }, [])
];
}
 ?>
