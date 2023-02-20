<?php
// init viewfactory.
$model_provider = new serviceproviders\ModelProviderImpl;
$view_factory = new views\factories\ViewFactory (
  $model_provider
);
$page = $model_provider -> get_page_model() -> get_current_page();
// init builder.
$builder = new views\builders\PageBuilder($view_factory);
// the theme used is forcing the use of a seperate file for rendering the header of the document.
echo $builder -> build_header() -> get() -> display();
?>
