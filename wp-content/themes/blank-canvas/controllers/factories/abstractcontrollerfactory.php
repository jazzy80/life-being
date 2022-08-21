<?php
interface AbstractControllerFactory {
  function get_controller(
    ModelProvider $provider,
    AbstractBuilder $builder
  ): BaseController;
}
?>
