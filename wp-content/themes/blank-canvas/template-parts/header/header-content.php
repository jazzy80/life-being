<?php
// init viewfactory.
$model_provider = new serviceproviders\ModelProviderImpl;
$view_factory = new views\factories\ViewFactory (
  $model_provider
);
$page = $model_provider -> get_page_model() -> get_current_page();
// init builder.
$builder = new views\builders\PageBuilder($view_factory);
$header_title = HEADER_TITLES[strtolower($page -> post_title)];
$header_subtitle = HEADER_SUBTITLES[strtolower($page -> post_title)];

if (in_array(strtolower($page -> post_title), PAGES_NEEDING_LITE_HEADER)) {
  echo $builder -> build_lite_header(
    \utils\MaybeCompanion :: cond(
      $header_title,
      $header_title
    ),
    \utils\MaybeCompanion :: cond(
      $header_subtitle,
      $header_subtitle
    )
  ) -> get() -> display();
}
// the theme used is forcing the use of a seperate file for rendering the header of the document.
else echo $builder -> build_header() -> get() -> display();
?>
