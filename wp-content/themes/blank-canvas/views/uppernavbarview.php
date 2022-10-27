<?php
namespace views;
class UpperNavBarView implements IView {
  public function display(): string {
    return <<< EOL
    <ul class="nav-links upper-navbar-links">
      <li><a href="/">Be Home</a></li>
      <li><a href="/being-me-being-you-2">Life Being Inspirations</a></li>
      <li><a href="/life-being-atelier">Life Being Atelier</a></li>
    </ul>
    EOL;
  }
}
?>
