<?php
require_once 'iview.php';

class HeaderView implements IView {
  public function __construct(WP_Post $current_post) {
    $this -> current_post = $current_post;
  }

  public function display(): string {}
}
?>
