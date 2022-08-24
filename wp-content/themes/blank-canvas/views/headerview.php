<?php
require_once 'iview.php';

// Class representing the Header portion of the UI.
class HeaderView implements IView {
  public function __construct(
    // Navbars are optional.
    Maybe /* <IView> */ $upper_navbar,
    Maybe /* <IView> */ $lower_navbar
  ) {
    $this -> upper_navbar = $upper_navbar;
    $this -> lower_navbar = $lower_navbar;
  }

  public function display(): string {
    return '<header class="header">
      <div class="navbar upper-navbar">
        <img class="logo" src="/resources/logo lifebeing.title.svg">'
        . $this -> upper_navbar -> map(fn(IView $v) => $v -> display()) -> get_or_else('') .
      '</div>
      <div class="title-with-btns">
        <i class="fas fa-chevron-left prev-button"></i>
        <div class="titles">
          <h1 class="title">Life Being</h1>
          <h3 class="subtitle">Spirit of Being You</h3>
        </div>
        <i class="fas fa-chevron-right next-button"></i>
      </div>'
      . $this -> lower_navbar -> map(fn(IView $v) => $v -> display()) -> get_or_else('') .
    '</header>';
  }
}
?>
