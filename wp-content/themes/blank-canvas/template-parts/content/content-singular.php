<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */
 function get_controller($page, $page_model, $builder) {
   switch (strtolower($page -> post_title)) {
   case HOME_PAGE: return new HomeController($builder);
   case VITALITY:
   case $page_model -> is_page_needing_vitality($page):
    return new VitalityController($builder);
   case GUESTBOOK:
    return new GuestBookController($builder);
   default: return new DefaultController($builder);
  }
 }

 $page = get_post();
 $page_model = new PageModel;
 $view_factory = new ViewFactory(
   $page_model,
   $page,
   wp_get_nav_menus()
 );
 $builder = new PageBuilder($view_factory);

 $controller = get_controller($page, $page_model, $builder);
 $controller -> get();
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
