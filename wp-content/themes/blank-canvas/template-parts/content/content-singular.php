<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */
 $controller_factory = new ControllerFactory;
 $model_provider = new ModelProviderImpl;
 $view_factory = new ViewFactory(
   $model_provider
 );
 $builder = new PageBuilder($view_factory);

 $controller = $controller_factory -> get_controller($model_provider, $builder);
 $controller -> get();
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
