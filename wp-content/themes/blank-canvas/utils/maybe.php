<?php
  namespace utils;
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

// Simple exception class for a value that is not present e.g. calling get on a `None` instance.
class ValueNotPresentError extends \Exception {}
?>
