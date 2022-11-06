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
            <img class="image" src="/resources/nature-art.jpg">
            <a href="/life-being-gallery?category=nature-art" class="image-caption"> Nature Art Photography</a>
        </div>
        <div class="image-container">
            <a href="/life-being-gallery?category=flowers-of-beauty" class="image-caption">Flowers of beauty</a>
            <img class="image" src="/resources/flowers-of-beauty.jpg">
        </div>
        <div class="image-container">
            <img class="image" src="/resources/poetry-art-kleurrijk.jpg">
            <a href="/life-being-gallery?category=poetry-art" class="image-caption"> Poetry Art</a>
        </div>
        <div class="image-container">
            <a href="/life-being-gallery?category=being-art" class="image-caption">Being Art</a>
            <img class="image" src="/resources/being-art-communicatie-bomen.png">
        </div>
        <div class="image-container">
            <img class="image" src="/resources/light-paintings.jpg">
            <a href="/life-being-gallery?category=light-paintings" class="image-caption">Light Paintings</a>
        </div>
    </main>
    EOL;
  }
}
?>
