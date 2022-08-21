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
        <h2 class="form-title"> New Comment </h2>
        Name <input class="input-name" name="name"></input>
        Comment (max 200 characters) <textarea class="comment-text" name="comment" rows="8"></textarea>
        <div class="form-btns">
          <button class="submit-comment">Add Comment</button>
          <button class="cancel-comment">Cancel Comment</button>
        </div>
      </form> '
      . $this -> generate_guestbook_entries() .
    '</div>
    <script src="' . LOAD_JAVASCRIPT[GUESTBOOK][0] . '"></script>';
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
