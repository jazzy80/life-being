<?php
class PageBuilder implements AbstractBuilder {
  private AbstractViewFactory $view_factory;
  private array $components;

  public function __construct(AbstractViewFactory $view_factory, array $components = []) {
    $this -> view_factory = $view_factory;
    $this -> components = $components;
  }

  public function build_header(): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $this -> view_factory -> create_header()]
    );
  }

  public function build_left_pane(): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $this -> view_factory -> create_left_pane()]
    );
  }
  public function build_right_pane(): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $this -> view_factory -> create_right_pane()]
    );
  }
  public function build_text_body(): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $this -> view_factory -> create_text_body()]
    );
  }
  public function build_vitality(): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $this -> view_factory -> create_vitality_menu()]
    );
  }

  public function build_guestbook(): AbstractBuilder {
    global $wpdb;
    $guest_book_entries = (new GuestBookModel($wpdb)) -> get_all_entries();
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, (new GuestBook($guest_book_entries))]
    );
  }

  public function get(): IView {
    return new CompositeView($this -> components);
  }
}
?>
