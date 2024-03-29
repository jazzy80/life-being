<?php
// Class representing the Header portion of the UI.
namespace views;
class HeaderView implements IView {
  private \utils\Maybe $header_title;
  private \utils\Maybe $header_subtitle;
  private \utils\Maybe $upper_navbar;

  public function __construct(
    \utils\Maybe $header_title,
    \utils\Maybe $header_subtitle,
    // Navbars are optional.
    \utils\Maybe /* <IView> */ $upper_navbar
  ) {
    $this -> header_title = $header_title;
    $this -> header_subtitle = $header_subtitle;
    $this -> upper_navbar = $upper_navbar;
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
          <h1 class="title">' . $this -> header_title -> get_or_else(DEFAULT_HEADER_TITLE) . '</h1>
          <h3 class="subtitle">'
          . $this -> header_subtitle -> get_or_else(DEFAULT_HEADER_SUBTITLE) .
          '</h3>
        </div>
        <i class="fas fa-chevron-right next-button"></i>
      </div>
    </header>';
  }
}
?>
