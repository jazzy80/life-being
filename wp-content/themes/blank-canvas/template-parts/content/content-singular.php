<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */
 $page_model = new PageModel;
 $controller = new SimpleController($page_model);
 $controller -> get();
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
