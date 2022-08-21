<?php
require_once 'modelprovider.php';

class ModelProviderImpl implements ModelProvider {
  function get_page_model(): PageModel {
    return new PageModel;
  }
  function get_guestbook_model(): GuestBookModel {
    global $wpdb;
    return new GuestBookModel($wpdb);
  }
}
?>
