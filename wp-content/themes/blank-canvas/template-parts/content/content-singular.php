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
// Get the current post/page
$current_post = get_post();
if (is_page_needing_vitality($current_post)) {
	// Render the vitality
	echo render_vitality_menu($current_post);
}
?>
<div class="entry-content">
	<?php
	//  Init script to generate the blog list and the pagination.
	if (strtolower($current_post -> post_title) === BLOG_PAGE) {
		echo '<script src="/scripts/dist/blogs.js"></script>';
	}
	//  Same for the poetry page.
	elseif (strtolower($current_post -> post_title) === POETRY_PAGE) {
		echo '<script src="/scripts/dist/poetry.js"></script>';
	}
	// Otherwise show the page/post using default WP/theme functionality.
	else {
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
	}
	?>
</div><!-- .entry-content -->
<?php
// Check if the current page should have a rigth sidebar.
if (!is_on_home($current_post)) {
	// Retrieve the most recent blog, poem and inspire.
	$blog_page = get_page_from_title(BLOG_PAGE);
	$poetry_page = get_page_from_title(POETRY_PAGE);
	$inspire_page = get_page_from_title(INSPIRE_PAGE);

	$blog_view = $blog_page -> bind(
		function($a) {
			return find_most_recent_child_page($a) -> map(function($b) {
				return new MostRecentArticleView(
					$b,
					"Meest recente blog"
				);
			});
		}
	);
	$poem_view = $poetry_page -> bind(
		function($a) {
			return find_most_recent_child_page($a) -> map(function($b) {
				return new MostRecentArticleView(
					$b,
					"Meest recent gedicht"
				);
			});
		}
	);
	$inspire_view = $inspire_page -> bind(
		function($a) {
			return find_most_recent_child_page($a) -> map(function($b) {
				return new MostRecentArticleView(
					$b,
					"Inspire"
				);
			});
		}
	);
	$container = new CompositeView(
		MaybeCompanion::flattenArray(
			[
				$blog_view,
				$poem_view,
				$inspire_view
			]
		),
		"most-recent-container"
	);
	echo $container -> display();
}
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
