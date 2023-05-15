<?php
// init viewfactory.

use utils\MaybeCompanion;

$model_provider = new serviceproviders\ModelProviderImpl;
$view_factory = new views\factories\ViewFactory (
  $model_provider
);
$page = $model_provider -> get_page_model() -> get_current_page();
$header_title = HEADER_TITLES[strtolower($page -> post_title)];
$header_subtitle = HEADER_SUBTITLES[strtolower($page -> post_title)];
// init builder.
$builder = new views\builders\PageBuilder($view_factory);
// the theme used is forcing the use of a seperate file for rendering the header of the document.
echo $builder -> build_header(
  MaybeCompanion :: cond($header_title, $header_title),
  MaybeCompanion :: cond($header_subtitle, $header_subtitle)
) -> get() -> display();
?>
