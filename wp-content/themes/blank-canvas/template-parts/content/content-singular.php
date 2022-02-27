<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */

$show_post_and_page_titles = get_theme_mod( 'show_post_and_page_titles', false );
if (strtolower(get_the_title()) === "life being inspirations") {
	$child_pages = get_pages(['parent' => get_the_ID()]);
	$output = '<div class="sidebar">
		<h5 class="sidebar-title">Vitality</h5>
		<ul>';
	foreach ($child_pages as $page) {
		$output .= '<li><a href="' . get_permalink($page) . '">' . $page -> post_title . '</a></li>';
	}
		$output .= '</ul></div>';
		echo $output;
}
?>
<div class="entry-content">
	<?php
	the_content(
		sprintf(
			wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'blank-canvas' ),
				array(
					'span' => array(
						'class' => array(),
					),
				)
			),
			get_the_title()
		)
	);

	wp_link_pages(
		array(
			'before' => '<div class="page-links">' . __( 'Pages:', 'blank-canvas' ),
			'after'  => '</div>',
		)
	);
	?>
</div><!-- .entry-content -->

<script src="/scripts/dist/app.js"></script>
