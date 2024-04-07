<?php

namespace Controller;

use Views\AtelierShopView;
use Views\Builders\PageBuilder;
use Views\IView;
use Views\JsFilesView;

class AtelierShopController implements IController {
	private PageBuilder $builder;

	/**
	 * @param PageBuilder $builder
	 */
	public function __construct( PageBuilder $builder ) {
		$this->builder = $builder;
	}

	public function handle(): IView {
		return $this->builder
			->add_page_component(new AtelierShopView())
			->add_page_component(new JsFilesView(["/scripts/dist/ateliershopmain.js"]))
			->build();
	}
}