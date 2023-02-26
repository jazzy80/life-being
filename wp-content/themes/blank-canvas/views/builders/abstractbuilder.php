<?php
namespace views\builders;
interface AbstractBuilder {
  public function build_header(\utils\Maybe $header_title, \utils\Maybe $header_substitle): AbstractBuilder;
  public function build_left_pane(): AbstractBuilder;
  public function build_right_pane(): AbstractBuilder;
  public function build_text_body(): AbstractBuilder;
  public function build_guestbook(array $guest_book_entries): AbstractBuilder;
  public function build_jsfiles(\WP_Post $page): AbstractBuilder;
  public function build_atelier_shop(\WP_Post $page): AbstractBuilder;
  public function get(): \views\IView;
}
?>
