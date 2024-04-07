<?php

/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Seedlet
 * @since 1.0.0
 */

get_header();
?>

<section id="primary" class="content-area">
	<main id="main" class="site-main default-max-width" role="main">

		<div class="entry-content not-found">
			<header class="page-header">
				<h1 class="page-title"><?php _e('De ingevoerde url bestaat helaas niet'); ?></h1>
				<a href="/"><?php _e('Naar "Be Home"') ?></a>
			</header><!-- .page-header -->

		</div><!-- .page-content -->
		</div><!-- .error-404 -->

	</main><!-- #main -->
</section><!-- #primary -->
<script src="/scripts/dist/app.js"></script>

<?php
get_footer();
