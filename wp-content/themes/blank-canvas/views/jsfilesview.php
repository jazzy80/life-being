<?php
require_once 'iview.php';

// Class representing "<script></script>" tags.
class JsFilesView implements IView {
  public function __construct(WP_Post $page) {
    $this -> page = $page;
  }

  public function display(): string {
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
