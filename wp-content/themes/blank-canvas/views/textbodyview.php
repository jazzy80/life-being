<?php
require_once 'iview.php';

class TextBodyView implements IView {
  private WP_Post $page;

  public function __construct(WP_Post $page) {
    $this -> page = $page;
  }

  public function display(): string {
    return '<div class="entry-content">' . do_shortcode(get_the_content(
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
		)) . '</div>';
  }
}
?>
