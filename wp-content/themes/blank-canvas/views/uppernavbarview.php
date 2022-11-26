<?php
namespace views;
class UpperNavBarView implements IView {
  public function display(): string {
    return <<< EOL
    <ul class="nav-links upper-navbar-links">
      <li><a href="/">Be Home</a></li>
      <li><a href="/being-me-being-you">Life Being Inspirations</a></li>
      <li><a href="/life-being-atelier">Life Being Atelier</a></li>
      <li><a href="/being-child-illustrations">Being child illustrations</a></li>
    </ul>
    EOL;
  }
}
?>
