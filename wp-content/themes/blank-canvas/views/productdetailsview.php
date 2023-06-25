<?php
namespace views;

class ProductDetailsView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="product-details">
      <img width="500px" class="product-image">
    </div>
    EOL;
  }
}
?>
