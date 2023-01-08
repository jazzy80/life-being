<?php
namespace views;
class BigDreamsView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="bigdreams-container">
      <h1 class="bigdreams-title">Big Dreams</h1>
      <div class="bigdreams-toolbar">
        <h4 class="pagination-text"></h4>
        <div>
          <label for="sort-dropdown">Sortering</label>
          <select id="sort-dropdown" class="bigdreams-sorting">
            <option>Alfabetisch</option>
          </select>
        </div>
      </div>
      <div class="bigdreams-images">
      </div>
      <div class="buttons">
        <button class="prev-btn">Vorige</button>
        <button class="next-btn">Volgende</button>
      </div>
    </div>
    EOL;
  }
}
?>
