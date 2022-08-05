<?php
// init viewfactory.
$view_factory = new viewfactory(
  new pagemodel,
  get_post(),
  wp_get_nav_menus()
);
// init builder.
$builder = new pagebuilder($view_factory);
// no controller is used, since rendering the header, should be straightforward.
// the theme used is forcing the use of a seperate file for rendering the header of the document.
echo $builder -> build_header() -> get() -> display();
?>
