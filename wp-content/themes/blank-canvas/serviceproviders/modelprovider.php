<?php
namespace serviceproviders;
interface ModelProvider {
  function get_page_model(): \models\PageModel;
  function get_guestbook_model(): \models\GuestBookModel;
}
?>
