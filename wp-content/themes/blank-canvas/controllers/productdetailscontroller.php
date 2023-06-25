<?php
namespace controllers;

class ProductDetailsController extends BaseController {
    public function create_view(): \views\IView {
        return $this -> builder
                     -> build_product_details($this -> page)
                     -> build_jsfiles($this -> page)
                     -> get();
      }
}