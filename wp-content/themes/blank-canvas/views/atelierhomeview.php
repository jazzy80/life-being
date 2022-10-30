<?php
namespace views;
class AtelierHomeView implements IView {
  private \WP_POST $page;
  function __construct(\WP_POST $page) {
    $this -> page = $page;
  }
  function display(): string {
    return <<< EOL
    <main class="main">
        <div class="image-container">
            <img class="image" src="/resources/boom_in_mist.jpg">
            <a href="/life-being-gallery?category=nature-art" class="image-caption"> Nature Art Photography</a>
        </div>
        <div class="image-container">
            <a href="/life-being-gallery?category=poetry-art" class="image-caption"> Poetry Art</a>
            <img class="image" src="/resources/boom_in_mist.jpg">
        </div>
        <div class="image-container">
            <img class="image" src="/resources/boom_in_mist.jpg">
            <a href="/life-being-gallery?category=being-art" class="image-caption">Being Arts</a>
        </div>
        <div class="image-container">
            <a href="/life-being-gallery?category=light-paintings" class="image-caption">Light Paintings</a>
            <img class="image" src="/resources/boom_in_mist.jpg">
        </div>
        <div class="image-container">
            <img class="image" src="/resources/boom_in_mist.jpg">
            <a href="/life-being-gallery?category=art-products" class="image-caption">Art Products</a>
        </div>
    </main>
    EOL;
  }
}
?>
