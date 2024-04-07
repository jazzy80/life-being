<?php
namespace Views;
class FooterView implements IView {
  public function display(): string {
    return <<< EOL
    <div class="footer">
      <div class="footer-row">
        <i class="fa fa-envelope-o" aria-hidden="true"></i>
        <p class="footer-email">jessicaheart@lifebeing.vision</p>
      </div>
    </div>
    EOL;
  }
}
?>
