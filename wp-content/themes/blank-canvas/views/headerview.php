<?php
require_once 'iview.php';

class HeaderView implements IView {
  public function __construct(
    IView $upper_navbar,
    IView $lower_navbar
  ) {
    $this -> upper_navbar = $upper_navbar;
    $this -> lower_navbar = $lower_navbar;
  }

  public function display(): string {
    $thumbnail_url = get_the_post_thumbnail_url(null, 'large');
      $script_tag = $thumbnail_url ? <<< EOL
      <script>
        var body = document.querySelector('body');
        body.style.backgroundImage = "url($thumbnail_url)";
      </script>'
      EOL : '';

    $header =
    '<header class="header">
      <div class="navbar upper-navbar">
        <object class="logo" data="/resources/logo lifebeing.title.svg"> </object>'
        . $this -> upper_navbar -> display() .
      '</div>
      <div class="title-with-btns">
        <i class="fas fa-chevron-left prev-button"></i>
        <div class="titles">
          <h1 class="title">Life Being</h1>
          <h3 class="subtitle">Spirit of Being You</h3>
        </div>
        <i class="fas fa-chevron-right next-button"></i>
      </div>'
      . $this -> lower_navbar -> display() .
    '</header>';
    return $script_tag . $header;
  }
}
?>
