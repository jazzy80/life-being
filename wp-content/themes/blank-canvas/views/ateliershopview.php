<?php
namespace views;
class AtelierShopView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="ateliershop-container">
      <div class="ateliershop-toolbar">
        <div class="filter-menu-container">
          <label for="filter-menu">Categorie</label>
          <select id="filter-menu" class="filter-menu">
          </select>
        </div>
        <div class="pagination">
          <h4 class="pagination-text"></h4>
          <div class="buttons">
            <button class="shop-prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="shop-next-btn"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
      <div class="ateliershop-images">
      </div>
    </div>
    EOL;
  }
}
?>
