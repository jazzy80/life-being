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
//  Generate the right sidebar for pages eligable.
$output = '<div class="right-side-container">';
// Check if the current page should have a rigth sidebar.
if (in_array(strtolower($current_post -> post_title), PAGES_WITH_MOST_RECENT_BAR)) {
	// Retrieve the most recent blog and poem.
	$most_recent_blog = find_most_recent_article(get_page_from_title(BLOG_PAGE));
	$most_recent_poem = find_most_recent_article(get_page_from_title(POETRY_PAGE));
	if ($most_recent_blog && $most_recent_poem) {
			$output .=
				'<div class="most-recent-blog">
					<p class="recent-blog-heading">Meest recente Blog</p>' .
					'<img src="' . filter_var(get_the_post_thumbnail_url($most_recent_blog -> ID), FILTER_SANITIZE_URL) . '"' .
					'<p>' . filter_var($most_recent_blog -> post_title, FILTER_SANITIZE_STRING) . '</p>' .
					'<a href="' . filter_var(get_permalink($most_recent_blog), FILTER_SANITIZE_URL) . '">
						Lees Blog
					</a>
				</div>
				<div class="inspire-block">
					<p> Inspire </p>
					<img src="/gallery/background photo/herfstboom.lichtvlek.jpg"/>
					<p> Inspire </p>
					<a href="#">Ga naar inspire</a>
				</div>
				<div class="recent-poem">
					<p>Meest recente gedicht</p>
					<img src="' . filter_var(get_the_post_thumbnail_url($most_recent_poem -> ID), FILTER_SANITIZE_URL) . '"' .
					'<p class="right-side-title">' . filter_var($most_recent_poem -> post_title, FILTER_SANITIZE_STRING) . '</p>
					 <a href="' . filter_var(get_permalink($most_recent_poem), FILTER_SANITIZE_URL) . '">
						Lees Gedicht
					</a>
				</div>
		</div>';
	}
}
$output .= '</div>';
echo $output;
?>
<!-- Add the main script for the site -->
<script src="/scripts/dist/app.js"></script>
