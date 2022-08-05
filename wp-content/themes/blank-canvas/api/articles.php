<?php
// Function to retrieve articles belonging to a specific page.
function get_articles_for_page(
  PageModel $page_model,
  string $page_title,
  object $data
): array {
  return $page_model -> get_page_from_title($page_title) -> map(
    fn(WP_Post $page): array =>
      get_articles($page_model, $data, $page)
    // if no pages are found, return an empty array.
    ) -> get_or_else([]);
}

// General function to retrieve articles.
function get_articles(PageModel $page_model, object $data, WP_Post $article_page) {
// Get the page number from retrieve '$data' object.
$page_number = intval(filter_var($data['page'], FILTER_SANITIZE_STRING));

// Articles are defined as child pages of the `$articel page`.
$articles = $page_model -> find_child_pages_of_parent($article_page);

// Get the articles for the specified `$page_number`.
$paginated_articles = array_slice($articles, $page_number * PAGINATION_SIZE, PAGINATION_SIZE);

return [
  'count' => sizeof($articles),
  'blogs' => array_reduce(
    $paginated_articles,
    fn(array $acc, WP_Post $article) =>
      array(...$acc, [
        'title' => filter_var($article -> post_title, FILTER_SANITIZE_STRING),
        'date' => date_format(date_create(filter_var($article-> post_date, FILTER_SANITIZE_STRING)), 'd-M-Y'),
        'excerpt' => filter_var($article-> post_excerpt, FILTER_SANITIZE_STRING),
        'url' => filter_var(get_permalink($article), FILTER_SANITIZE_URL),
        'featured_image_url' => filter_var(get_the_post_thumbnail_url($article), FILTER_SANITIZE_URL)
      ]),
    [])
  ];
}
?>
