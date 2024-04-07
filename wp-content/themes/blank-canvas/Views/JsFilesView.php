<?php
// Class representing "<script></script>" tags.
namespace Views;



class JsFilesView implements IView
{
  private array $js_files = [];

  public function __construct(array $js_files)
  {
    $this->js_files = $js_files;
  }

  public function display(): string
  {
    if (count($this->js_files) === 0) {
      return '';
    }

    return array_reduce(
      $this->js_files,
      fn (string $html, string $js_file): string =>
      $html . '<script src="' . $js_file . '"></script>',
      ''
    );
  }
}
