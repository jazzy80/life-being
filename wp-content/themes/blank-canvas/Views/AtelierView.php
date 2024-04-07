<?php

namespace Views;

class AtelierView implements IView
{
  public function display(): string
  {
    return <<< EOL
    <div class="ateliershop-container">
      <div class="ateliershop-text">
        <p>In mijn Atelier mag ik
          een belangrijk deel van mijn werk met jou delen.
          Laat je verwonderen in mijn kleurrijke binnenwereld
          wat ik heb vormgegeven in pastelkrijttekeningen, 
          schilderijen, natuurfoto's, foto' met poetische tekst en
          ansichtkaarten.
        </p>
      </div>
      <div class="ateliershop-toolbar">
        <div class="filter-menu-container">
          <label for="filter-menu">Categorie</label>
          <select id="filter-menu" class="filter-menu">
          </select>
        </div>
      </div>
      <div class="ateliershop-images">
      </div>
      <button class="shop-next-btn">Meer</button>
    </div>
    EOL;
  }
}
