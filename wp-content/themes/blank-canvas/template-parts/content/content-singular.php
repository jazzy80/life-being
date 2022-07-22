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
// Render the left side bar.
echo get_left_side_bar($current_post);
?>
<div class="entry-content">
	<?php
	//  Init script to generate the blog list and the pagination.
	if ($current_post -> post_title === BLOG_PAGE) {
		echo '<script src="/scripts/dist/blogs.js"></script>';
	}
	//  Same for the poetry page.
	elseif ($current_post -> post_title === POETRY_PAGE) {
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
<<<<<<< Updated upstream
	// TODO generalize and remove obvious code dublication.
=======
>>>>>>> Stashed changes
	$blog_page = get_page_from_title(BLOG_PAGE);
	$poetry_page = get_page_from_title(POETRY_PAGE);
	$inspire_page = get_page_from_title(INSPIRE_PAGE);

	$blog_view = $blog_page -> map(
		function($a) {
			find_most_recent_article($a) -> map(function($b) {
				new MostRecentArticleView(
					$b,
					"Meest recente blog"
				);
			});
		}
	);
	$poem_view = $poetry_page -> map(
		function($a) {
			find_most_recent_article($a) -> map(function($b) {
				new MostRecentArticleView(
					$b,
					"Meest recent gedicht"
				);
			});
		}
	);
	$insipire_view = $inspire_page -> map(
		function($a) {
			find_most_recent_article($a) -> map(function($b) {
				new MostRecentArticleView(
					$b,
					"Inspire"
				);
			});
		}
	);
	$container = new MostRecentArticleContainer(
		[
			$blog_view,
			$poem_view,
			$inspire_view
		]
	);
	echo $container -> display();
}
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
