<?php
function render_guest_book(array $guest_book_entries): string {
  return '
  <h2 class="body-title">Leave a comment below</h2>
  <a class="add-comment" href="#">Add a comment</a>
  <form class="form">
    <h2> New Comment: </h2>
    Name: <input></input>
    Comment <textarea></textarea>
  </form> '
  . generate_html_from_guestbook_entries($guest_book_entries);
}

function generate_html_from_guestbook_entries(array $guest_book_entries): string {
  return array_reduce(
    $guest_book_entries,
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
?>
