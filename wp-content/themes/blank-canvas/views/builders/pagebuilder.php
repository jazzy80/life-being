<?php
class PageBuilder implements AbstractBuilder {
  private AbstractViewFactory $view_factory;
  private array $components;

  public function __construct(AbstractViewFactory $view_factory, array $components = []) {
    $this -> view_factory = $view_factory;
    $this -> components = $components;
  }

  public function build_header(): AbstractBuilder {
      return $this -> add_component($this -> view_factory -> create_header());
  }

  public function build_lite_header(): AbstractBuilder {
    return $this -> add_component(new HeaderView(new Just(new UpperNavBarView), new None));
  }

  public function build_left_pane(): AbstractBuilder {
      return $this -> add_component($this -> view_factory -> create_left_pane());
  }

  public function build_right_pane(): AbstractBuilder {
      return $this -> add_component($this -> view_factory -> create_right_pane());
  }

  public function build_text_body(): AbstractBuilder {
      return $this -> add_component($this -> view_factory -> create_text_body());
  }

  public function build_vitality(): AbstractBuilder {
      return $this -> add_component($this -> view_factory -> create_vitality_menu());
  }

  public function build_guestbook(array $guest_book_entries): AbstractBuilder {
      return $this -> add_component(new GuestBook($guest_book_entries));
  }

  public function build_jsfiles(WP_Post $page): AbstractBuilder {
      return $this -> add_component(new JsFilesView($page));
  }

  public function get(): IView {
    return new CompositeView($this -> components);
  }

  private function add_component(IView $component): AbstractBuilder {
    return new PageBuilder(
      $this -> view_factory,
      [...$this -> components, $component]
    );
  }
}
?>
