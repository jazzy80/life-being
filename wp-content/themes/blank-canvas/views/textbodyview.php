<?php
require_once 'iview.php';

class TextBodyView implements IView {
  private WP_Post $page;

  public function __construct(WP_Post $page) {
    $this -> page = $page;
  }

  public function display(): string {
    return '<div class="entry-content">' . get_the_content() . '</div>'
      . $this -> load_js_files();
  }

  private function load_js_files(): string {
    $js_files = LOAD_JAVASCRIPT[strtolower($this -> page -> post_title)];
    return $js_files ? array_reduce(
      $js_files,
      fn(string $html, string $js_file): string =>
        $html . '<script src="' . $js_file . '"></script>',
      ''
    ) : '';
  }
}
?>
