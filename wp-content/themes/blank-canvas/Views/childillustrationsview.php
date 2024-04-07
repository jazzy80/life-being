<?php
namespace Views;
class ChildIllustrationsView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="illustrations-container">
      <div class="big-dreams">
        <a href="/big-dreams?category=big-dreams">
          <img src="/resources/dreamcloud.big dreams.svg">
        </a>
      </div>
      <div class="day-dreams">
        <a href="/big-dreams?category=day-dreams">
          <img src="/resources/dreamcloud.day dreams.svg">
        </a>
      </div>
      <div class="books-and-more">
        <a href="big-dreams?category=books-and-more">
          <img src="/resources/dreamcloud.books and more.svg">
        </a>
      </div>
    </div>
    EOL;
  }
}
?>
