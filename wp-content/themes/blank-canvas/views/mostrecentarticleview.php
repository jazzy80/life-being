<?php

require_once "iview.php";
/*
a View representing a most recent article page.
*/
class MostRecentArticleView implements IView {
  public function __construct(
    WP_Post $most_recent_article,
    string $header_title
  )
  {
    $this -> most_recent_article = $most_recent_article;
    $this -> header_title = $header_title;
  }

  public function display(): string {
    return '<div class="most-recent-blog">
      <p>' . $this -> header_title . '</p>' .
      '<img src="' . filter_var(get_the_post_thumbnail_url($this -> most_recent_article -> ID), FILTER_SANITIZE_URL) . '">' .
      '<a href="' . filter_var(get_permalink($this -> most_recent_article), FILTER_SANITIZE_URL) . '">' .
        filter_var($this -> most_recent_article -> post_title, FILTER_SANITIZE_STRING) .
      '</a>
    </div>';
  }
}
?>
