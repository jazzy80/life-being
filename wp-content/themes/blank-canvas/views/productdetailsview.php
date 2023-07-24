<?php

namespace views;

class ProductDetailsView implements IView
{
  public function display(): string
  {
    return <<< EOL
    <div class="product-details">
      <div class="detail-row">
        <img class="product-detail-image">
      </div>
    </div>
    EOL;
  }
}
