<?php
namespace views;
class GuestBook implements IView {
  private array $guest_book_entries;

  public function __construct($guest_book_entries) {
    $this -> guest_book_entries = $guest_book_entries;
  }
  function display(): string {
    return '
    <div class="guestbook">
      <h2 class="body-title">Voel je vrij om je ervaringen met elkaar te delen in dit gastenboek.</h2>
      <a class="add-comment">Plaats bericht</a>
      <form class="guestbook-form">
        <h2 class="form-title">Nieuw bericht</h2>
        Naam <input class="input-name" name="name"></input>
        Bericht (max 200 characters) <textarea class="comment-text" name="comment" rows="8"></textarea>
        <div class="form-btns">
          <button class="submit-comment">Plaats bericht</button>
          <button class="cancel-comment">Annuleer</button>
        </div>
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
    ) . '</ul>';
  }
}
?>
