<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Blank Canvas
 * @since 1.0
 */

define('LIFE_BEING_INSPR_TITLE', 'life being inspirations');

// Could not find a standard function that could find a value based on a predicate
// Beneath a simple implementation of such a function
function find_if($arr, callable $p) {
	foreach ($arr as $value) {
		if ($p($value) === true) return $value;
	}
	return null;
};

$show_post_and_page_titles = get_theme_mod( 'show_post_and_page_titles', false );
// Get the current post/page
$current_post = get_post();
// life being inspirations is special, since it requires a sidebar
// Retrieve its ID
$life_being_insp_page= find_if(get_pages(), function($page) {
	return strtolower($page -> post_title) === LIFE_BEING_INSPR_TITLE;
});
$life_being_insp_id = $life_being_insp_page ? $life_being_insp_page -> ID : null;
// If current page is the life being inspirations page or a child of that page
if (
		$current_post -> ID === $life_being_insp_id ||
		$current_post -> post_parent === $life_being_insp_id
	) {
	// get child pages of life being inspirations
	$child_pages = get_pages(['parent' => $life_being_insp_id]);
	// Use links of child pages to auto populare the sidebar.
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
