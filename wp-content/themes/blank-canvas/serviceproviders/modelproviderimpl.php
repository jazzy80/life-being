<?php
namespace serviceproviders;
class ModelProviderImpl implements ModelProvider {
  function get_page_model(): \models\PageModel {
    return new \models\PageModel;
  }
  function get_guestbook_model(): \models\GuestBookModel {
    global $wpdb;
    return new \models\GuestBookModel($wpdb);
  }
}
?>
