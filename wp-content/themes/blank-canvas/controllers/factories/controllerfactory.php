<?php
require_once 'abstractcontrollerfactory.php';

class ControllerFactory implements AbstractControllerFactory {
  function get_controller(
    ModelProvider $provider,
    AbstractBuilder $builder
  ): BaseController {
    $page_model = $provider -> get_page_model();
    $page = $page_model -> get_current_page();

    switch (strtolower($page -> post_title)) {
    case HOME_PAGE: return new HomeController($builder, $provider);
    case VITALITY:
    case $page_model -> is_page_needing_vitality($page):
     return new VitalityController($builder, $provider);
    case GUESTBOOK:
     return new GuestBookController($builder, $provider);
    default: return new DefaultController($builder, $provider);
   }
  }
}
?>
