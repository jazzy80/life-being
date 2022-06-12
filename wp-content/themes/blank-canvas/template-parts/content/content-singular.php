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
	// TODO generalize and remove obvious code dublication.
	$blog_page = get_page_from_title(BLOG_PAGE);
	$poetry_page = get_page_from_title(POETRY_PAGE);
	$inspire_page = get_page_from_title(INSPIRE_PAGE);
	$most_recent_blog = $blog_page ? find_most_recent_article($blog_page) : null;
	$most_recent_poem = $poetry_page ? find_most_recent_article($poetry_page) : null;
	$most_recent_inspire = $inspire_page ? find_most_recent_article($inspire_page) : null;
	// Create HTML div with most recent articles
	echo create_container_with_most_recent_articles(
		// className for the div
		'most-recent-container',
		// list of generated HTML articles.
		[
			get_most_recent_article(
			// page
			$most_recent_blog,
			// title
			'Meest recente Blog',
			// class
			'most-recent-blog',
			// class for header <p> tag.
			'recent_blog_heading'
			),
			get_most_recent_article(
				$most_recent_inspire,
				'Inspire',
				'inspire-block',
				'recent-inspire'
			),
			get_most_recent_article(
				$most_recent_poem,
				'Meest recente gedicht',
				'recent-poem',
				'most-recent-poem'
			)
		]
	);
}
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
