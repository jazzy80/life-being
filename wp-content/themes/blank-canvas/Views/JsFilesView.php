<?php
// Class representing "<script></script>" tags.
namespace Views;

class JsFilesView implements IView
{
  private \Domain\Repositories\IPageRepository $page_repository;

  public function __construct( \Domain\Repositories\IPageRepository $page_repository)
  {
    $this->page_repository = $page_repository;
  }

  public function display(): string
  {
    $js_files = LOAD_JAVASCRIPT[strtolower($this->page_repository->get_current_page()->post_title)];
    return $js_files ? array_reduce(
      $js_files,
      fn (string $html, string $js_file): string =>
      $html . '<script src="' . $js_file . '"></script>',
      ''
    ) : '';
  }
}
