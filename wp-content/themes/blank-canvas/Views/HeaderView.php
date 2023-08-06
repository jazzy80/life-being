<?php
// Class representing the Header portion of the UI.
namespace Views;

class HeaderView implements IView
{
  private string $header_title = "Life being";
  private string $header_subtitle = "Spirit of being you";
  private IView $navbar;

  public function __construct(
    IView $navbar
  ) {
    $this->navbar = $navbar;
  }

  public function display(): string
  {
    return '<header class="header">
      <div class="navbar upper-navbar">
        <img class="logo" src="/resources/logo lifebeing.title.svg">'
      . $this->navbar->display() .
      "</div>
            <div class=\"title-with-btns\">
              <i class=\"fas fa-chevron-left prev-button\"></i>
              <div class=\"titles\">
              <h1 class=\"title\">$this->header_title</h1>
              <h3 class=\"subtitle\">
                $this->header_subtitle
              </h3>
            </div>
            <i class=\"fas fa-chevron-right next-button\"></i>
          </header>
        </div>";
  }
}
