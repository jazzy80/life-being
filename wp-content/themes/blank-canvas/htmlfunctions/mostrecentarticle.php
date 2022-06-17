<?php
/*
render HTML using a most recent post.
*/
function get_most_recent_article(
  ?WP_Post $most_recent_article,
  string $header_title,
  string $div_class,
  string $p_heading_class = ''): string {
  return $most_recent_article ? '<div class="' . $div_class . '">
    <p class="' . $p_heading_class . '">' . $header_title . '</p>' .
    '<img src="' . filter_var(get_the_post_thumbnail_url($most_recent_article -> ID), FILTER_SANITIZE_URL) . '">' .
    '<a href="' . filter_var(get_permalink($most_recent_article), FILTER_SANITIZE_URL) . '">' .
      filter_var($most_recent_article -> post_title, FILTER_SANITIZE_STRING) .
    '</a>
  </div>' : '';
}
/*
Create a div html container using array of articles as HTML
*/
function create_container_with_most_recent_articles(
  string $container_class,
  array $html_articles,
  string $style = ''
): string {
  // Iterate over the html articles and add them to a general div container.
  return array_reduce($html_articles, function(string $full_html, string $article) {
    return $full_html . $article;
  }, '<div class="' . $container_class . '" style="' . $style . '">') . '</div>';
}
?>
