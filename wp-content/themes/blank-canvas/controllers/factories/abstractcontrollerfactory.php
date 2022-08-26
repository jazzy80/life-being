<?php
namespace controllers\factories;
interface AbstractControllerFactory {
  function get_controller(
    \serviceproviders\ModelProvider $provider,
    \views\builders\AbstractBuilder $builder
  ): \controllers\BaseController;
}
?>
