<?php
namespace views;
class BigDreamsView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="bigdreams-container">
      <h1 class="bigdreams-title">Big Dreams</h1>
      <div class="bigdreams-toolbar">
        <h4 class="pagination-text">Foto's 1 t/m 9 getoond van de 115</h4>
        <div>
          <label for="sort-dropdown">Sortering</label>
          <select id="sort-dropdown" class="bigdreams-sorting">
            <option>Alfabetisch</option>
          </select>
        </div>
      </div>
      <div class="bigdreams-images">
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
        <div class="image-frame">
          <span class="image-text"> Foto Text</span>
          <img src="/wp-content/uploads/2022/11/spelen-zonder-klok..jpg">
        </div>
      </div>
      <div class="buttons">
        <button>Vorige</button>
        <button>Volgende</button>
      </div>
    </div>
    EOL;
  }
}
?>
