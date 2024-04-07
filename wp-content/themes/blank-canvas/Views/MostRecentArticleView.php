<?php
/*
a View representing a most recent article page.
*/

namespace Views;

class MostRecentArticleView implements IView
{
  private string $header_title;
  private \WP_Post $recent_article;

  public function __construct(
    string $header_title,
    \WP_Post $recent_article
  ) {
    $this->header_title = $header_title;
    $this->recent_article = $recent_article;
  }

  public function display(): string
  {
    return '<div class="most-recent-blog">
      <p>' . $this->header_title . '</p>' .
      '<img src="' . filter_var(get_the_post_thumbnail_url($this->recent_article->ID), FILTER_SANITIZE_URL) . '">' .
      '<a href="' . filter_var(get_permalink($this->recent_article), FILTER_SANITIZE_URL) . '">' .
      filter_var($this->recent_article->post_title, FILTER_SANITIZE_STRING) .
      '</a>
    </div>';
  }
}
