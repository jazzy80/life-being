<?php
interface ModelProvider {
  function get_page_model(): PageModel;
  function get_guestbook_model(): GuestBookModel;
}
?>
