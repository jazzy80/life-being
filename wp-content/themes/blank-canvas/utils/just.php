<?php
/**
*`Just` represent a `Maybe` that has a value.
**/
namespace utils;
class Just implements Maybe {
  public function __construct($a) {
    $this -> a = $a;
  }
  public function bind(callable $fb): Maybe {
    return $fb($this -> a);
  }

  public function map(callable $fb): Maybe {
    return new Just($fb($this -> a));
  }
  public function get_or_else($fallback) {
    return $this -> a;
  }

  public function or_else(Maybe $other): Maybe {
    return $this;
  }

  public function get() { return $this -> a;}
}
?>
