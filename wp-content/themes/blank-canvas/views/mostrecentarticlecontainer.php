<?php

require_once "iview.php";

class MostRecentArticleContainer implements IView {
  public function __construct(array $articles) {
    $this -> articles = $articles;
  }

  public function display(): string {
    return array_reduce($this -> articles, function(string $page, IView $article) {
      return $page . $article -> display();
    }, '<div class="most-recent-container">') . '</div>';
  }
}
 ?>
