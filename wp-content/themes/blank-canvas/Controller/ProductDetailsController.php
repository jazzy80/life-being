<?php

namespace Controller;

use Domain\Exceptions\ProductDoesNotExist;
use Domain\Services\IProductService;
use Views\Builders\IPageBuilder;
use Views\IView;
use Views\JsFilesView;
use Views\ProductDetailsView;
use Views\ViewModels\ProductViewModel;

class ProductDetailsController implements IController {
	private int $product_id;
	private IPageBuilder $builder;
	private IProductService $service;

	/**
	 * @param int $product_id
	 * @param IPageBuilder $builder
	 * @param IProductService $service
	 */
	public function __construct( int $product_id, IPageBuilder $builder, IProductService $service ) {
		$this->product_id = $product_id;
		$this->builder = $builder;
		$this->service = $service;
	}

	/**
	 * @throws ProductDoesNotExist
	 */
	public function handle(): IView {
		$product = $this->service->get_product($this->product_id);
		return $this->builder
			->add_page_component( new ProductDetailsView(new ProductViewModel(
				$product->get_id(),
				$product->get_name(),
				$product->get_description(),
				$product->get_price(),
				$product->get_image(),
				$product->get_width(),
				$product->get_height(),
				$product->get_categories(),
				$product->get_product_options(),
				$product->get_parts(),
			)) )
			->add_page_component( new JsFilesView( [ "/scripts/dist/productdetailsmain.js" ] ) )
			->build();
	}
}