<?php
namespace views;
class AtelierShopView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="ateliershop-container">
      <div class="ateliershop-text">
        <p>In mijn AtelierShop mag ik
          een belangrijk deel van mijn werk met jou delen.
          Laat je verwonderen in mijn kleurrijke binnenwereld
          wat ik heb vormgegeven in pastelkrijttekeningen, 
          schilderijen, natuurfoto's, foto' met poetische tekst en
          ansichtkaarten.
        </p>
        <p> Voel wat de kunst met je doet.
            Als je voelt dat een kunstwerk je huis mag
            oplichten, dan kun je het <a href="/connection">contactformulier</a> gebruiken of 
            een <a href="mailto:jessicaheart@lifebeing.vision">mail sturen</a>.<br> 
            Laat je naam, emailadres en adresgegevens achter met item dat je wilt bestellen,
            dan neem ik contact met je op.
        </p>
      </div>
      <div class="ateliershop-toolbar">
        <div class="filter-menu-container">
          <label for="filter-menu">Categorie</label>
          <select id="filter-menu" class="filter-menu">
          </select>
        </div>
      </div>
      <div class="buttons">
        <button class="shop-prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="shop-next-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
      <h4 class="pagination-text"></h4>
      <div class="ateliershop-images">
      </div>
    </div>
    EOL;
  }
}
?>
