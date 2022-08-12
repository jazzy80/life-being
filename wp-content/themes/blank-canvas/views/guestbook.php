<?php

class GuestBook implements IView {
  public function __construct($guest_book_entries) {
    $this -> guest_book_entries = $guest_book_entries;
  }
  function display(): string {
    return '
    <div class="guestbook">
      <h2 class="body-title">Leave a comment below</h2>
      <a class="add-comment">Add a comment</a>
      <form class="guestbook-form">
        <h2> New Comment: </h2>
        Name: <input></input>
        Comment <textarea></textarea>
      </form> '
      . $this -> generate_guestbook_entries() .
    '</div>';
  }

  private function generate_guestbook_entries(): string {
    return array_reduce(
      $this -> guest_book_entries,
      function(string $html, GuestBookEntry $entry): string {
        return $html . '<li class="comment">
          <div>
            <p>' . $entry -> name . '</p>
            <p>' .  $entry -> date  . '</p>
            <p>' .  $entry -> time  . '</p>
            </div>
            <div>
              <p>' . $entry -> text_body . '</p>
            </div>
        </li>
        <hr>';
      },
      // initial HTML.
      '<ul class="comments"><hr>'
      // Close list.
    ) . '</ul>';
  }
}
?>
