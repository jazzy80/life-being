<?php
// Class representing the Header portion of the UI.
namespace views;

class HeaderView implements IView
{
  private string $header_title;
  private string $header_subtitle;
  private \views\IView $navbar;

  public function __construct(
    string $header_title,
    string $header_subtitle,
    \views\IView $navbar
  ) {
    $this->header_title = $header_title;
    $this->header_subtitle = $header_subtitle;
    $this->navbar = $navbar;
  }

  public function display(): string
  {
    return '<header class="header">
      <div class="navbar upper-navbar">
        <img class="logo" src="/resources/logo lifebeing.title.svg">'
      . $this->navbar->display() .
      '</div>
      <div class="title-with-btns">
        <i class="fas fa-chevron-left prev-button"></i>
        <div class="titles">
          <h1 class="title">' . $this->header_title  . '</h1>
          <h3 class="subtitle">'
      . $this->header_subtitle .
      '</h3>
        </div>
        <i class="fas fa-chevron-right next-button"></i>
      </div>
    </header>';
  }
}
