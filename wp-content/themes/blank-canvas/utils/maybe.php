<?php
  /**
  *Maybe is a type that either contains a value `Just` or nothing `None`
  **/
  interface Maybe {
    // bind(A => Maybe<B>): Maybe<B>.
    public function bind(callable $fb): Maybe;
    // map(A => B): Maybe<B>.
    public function map(callable $fb): Maybe;
    // Retrieves the value contained in the Maybe or `fallback` if `None`.
    // get_or_else(a: A): A.
    public function get_or_else($fallback);
    // If None return the 'other' maybe else this maybe.
    public function or_else(Maybe $other): Maybe;
    // Retrieves the value container in the Maybe or throws if `None`.
    // get(): A.
    public function get();
  }

  /**
  *`Just` represent a `Maybe` that has a value.
  **/
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

  /**
  * `None` represents a Maybe that does not contain a value.
  **/
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

// Simple exception class for a value that is not present e.g. calling get on a `None` instance.
class ValueNotPresentError extends Exception {}

// Convenience class for `Maybe`.
class MaybeCompanion {
    /**
    *Static function to filter `None` values from an array of `Maybe`s,
    *and retrieve the values from the `Just`s.
    *array<Maybe<A>> -> array<A>.
    **/

    public static function flattenArray(array $maybes): array {
      // Retrieve the values from the `Just`s.
      return array_map(
        fn(Maybe $maybe) => $maybe -> get(),
        // filter out all `None`s.
        array_filter(
          $maybes,
          fn(Maybe $maybe) => $maybe instanceof Just
        )
      );
    }

    public static function to_maybe($a): Maybe {
      if (!$a) return new None;
      return new Just($a);
    }
  }
?>
