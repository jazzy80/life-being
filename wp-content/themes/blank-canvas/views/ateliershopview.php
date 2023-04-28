<?php
namespace views;
class AtelierShopView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="bigdreams-container">
      <div class="bigdreams-toolbar">
        <div class="filter-menu-container">
          <label for="filter-menu">Categorie</label>
          <select id="filter-menu" class="filter-menu">
          </select>
        </div>
        <div class="pagination">
          <h4 class="pagination-text"></h4>
          <div class="buttons">
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
      <div class="bigdreams-images">
      </div>
    </div>
    EOL;
  }
}
?>
