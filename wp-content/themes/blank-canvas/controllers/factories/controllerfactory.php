<?php
namespace controllers\factories;
class ControllerFactory implements AbstractControllerFactory {
  function get_controller(
    \serviceproviders\ModelProvider $provider,
    \views\builders\AbstractBuilder $builder
  ): \controllers\BaseController {
    $page_model = $provider -> get_page_model();
    $page = $page_model -> get_current_page();

    switch (strtolower($page -> post_title)) {
    case HOME_PAGE: return new \controllers\HomeController($builder, $provider);
    case GUESTBOOK:
     return new \controllers\GuestBookController($builder, $provider);
    case ATELIER:
     return new \controllers\AtelierHomeController($builder, $provider);
    case ATELIERGALLERY:
      return new \controllers\AtelierGalleryController($builder, $provider);
    case CHILD_ILLUSTRATIONS:
      return new \controllers\ChildIllustrationsContoller($builder, $provider);
    case BIG_DREAMS:
      return new \controllers\BigDreamsController($builder, $provider);
    default: return new \controllers\DefaultController($builder, $provider);
   }
  }
}
?>
