<?php
/**
* `None` represents a Maybe that does not contain a value.
**/
namespace utils;
class None implements Maybe {
  public function bind(callable $fb): Maybe {return $this;}
  public function map(callable $fb): Maybe {return $this;}
  public function get_or_else($fallback) {
    return $fallback;
  }
  public function or_else(Maybe $other): Maybe {
    return $other;
  }
  public function get() { throw new ValueNotPresentError;}
}
?>
