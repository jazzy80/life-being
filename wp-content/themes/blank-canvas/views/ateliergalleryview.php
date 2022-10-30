<?php
namespace views;
class AtelierGalleryView implements IView {
  private \WP_POST $page;
  function __construct(\WP_POST $page) {
    $this -> page = $page;
  }
  function display(): string {
    return '<div class="atelier">
        <span class="sidebar-back-link">
           <i class="fas fa-angle-double-left"></i>
           <li>
            <a href="/life-being-atelier">
              Terug
            </a>
          </li>
          </span>
        <div class="zoom-image"></div>
        <ul class="atelier-image-list"></ul>
      </div>';
  }
}
?>
