<?php
  /**
  *Maybe is a type that either contains a value `Just` or nothing `None`
  **/
  namespace utils;
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
