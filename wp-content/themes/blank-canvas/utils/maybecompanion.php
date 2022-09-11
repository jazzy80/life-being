<?php
namespace utils;
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
