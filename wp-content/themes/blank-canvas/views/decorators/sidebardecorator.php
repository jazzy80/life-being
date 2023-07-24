<?php

namespace views\decorators;

class HTMLClassDecorator implements \views\IView
{
  private \views\IView $view;

  private string $tag_name;

  private array $classes;


  public function __construct(\views\IView $view, string $tag_name, array $classes)
  {
    $this->view = $view;
    $this->tag_name = $tag_name;
    $this->classes = $classes;
  }

  public function display(): string
  {
    return <<< EOL
      <$this->tag_name class="{implode(" ", $this->classes)}"> $this->view->display()</$this->tag_name>
      EOL;
  }
}
