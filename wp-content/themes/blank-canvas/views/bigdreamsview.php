<?php
namespace views;
class BigDreamsView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="bigdreams-container">
      <h1 class="bigdreams-title">Big Dreams</h1>
      <div class="loader"></div>
      <div class="content">
        <div class="bigdreams-toolbar">
          <h4 class="pagination-text"></h4>
        </div>
        <div class="buttons">
          <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="bigdreams-images">
        </div>
        <div class="buttons">
          <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
          <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
    EOL;
  }
}
?>
