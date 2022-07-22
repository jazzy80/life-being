<?php
  interface Maybe {
    public function bind(callable $fb): Maybe;
    public function map(callable $fb): Maybe;
    public get_or_else(fallback);
  }

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
    public function get_or_else(fallback) {
      return $this -> a;
    }
  }

  class None implements Maybe {
    public function bind(callable $fb): Maybe {return new None;}
    public function map(callable $fb): Maybe {return new None;}
    public function get_or_else($fallback) {
      return $fallback;
    }
  }
?>
