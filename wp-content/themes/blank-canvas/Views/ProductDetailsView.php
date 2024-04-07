<?php

namespace Views;

use Domain\Models\Part;
use Views\ViewModels\ProductViewModel;

class ProductDetailsView implements IView {
	private ProductViewModel $view_model;

	/**
	 * @param ProductViewModel $view_model
	 */
	public function __construct( ProductViewModel $view_model ) {
		$this->view_model = $view_model;
	}

	public function display(): string {
		return "<div class=\"product-details\">
			<h4>{$this->view_model->get_name()}</h4>
	  	<img class=\"product-detail-image\" src=\"{$this->view_model->get_image_url()}\">
		<div class=\"detail-row\">
			 <div>
					<h3 class=\"product-description\"> Product Beschrijving:</h3>
					<h4>Onderdelen:</h4>
					<ul class=\"list-product-parts\">" .
		       array_reduce(
						 $this->view_model->get_parts(),
						 fn( string $acc, Part $part ) => $acc . "<li>" . $part->as_html() . "</li>", "" ) .
		       "</ul>
			 </div>
			<div class='product-options'>" .
		       ( count( array_values( $this->view_model->get_product_options() ) ) <= 0 ? "" :
			       "<p>Kies jouw opties:</p>
				<form>
				  {$this->view_model->product_options_as_html()}
				</form>" ) .
		       "<div class=\"price-summary\">
					<p>Totaalprijs:</p>
					<h1 class=\"price\">€{$this->view_model->get_price()}</h1>
				</div>
				<button class=\"buy-btn\">Bestellen</button>
			</div>
		</div>
</div>";
	}
}
