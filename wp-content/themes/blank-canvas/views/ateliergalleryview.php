<?php
namespace views;
class AtelierGalleryView implements IView {
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
