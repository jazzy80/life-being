<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */
 $controller_factory = new controllers\factories\ControllerFactory;
 $model_provider = new serviceproviders\ModelProviderImpl;
 $view_factory = new \views\factories\ViewFactory(
   $model_provider
 );
 $builder = new views\builders\PageBuilder($view_factory);

 $controller = $controller_factory -> get_controller($model_provider, $builder);
 $controller -> get();
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
