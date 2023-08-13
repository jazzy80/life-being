<?php

namespace Controller;

use Views\Builders\IPageBuilder;
use Views\IView;
use Views\JsFilesView;
use Views\ProductDetailsView;

class ProductDetailsController implements IController {
	private IPageBuilder $builder;

	/**
	 * @param IPageBuilder $builder
	 */
	public function __construct( IPageBuilder $builder ) {
		$this->builder = $builder;
	}

	public function handle(): IView {
		return $this->builder
			->add_page_component(new JsFilesView(["/scripts/dist/productdetailsmain.js"]))
			->add_page_component(new ProductDetailsView())
			->build();
	}
}