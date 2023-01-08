<?php
namespace utils;
// Class with static functions for the `Maybe` type.
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

    // Construct a Maybe from a cond expression `$a` and a true expression `$t`.
    // bool -> <A> -> Maybe<A>.
    public static function cond(?bool $a, $t): Maybe {
      if ($a) return new Just($t);
      else return new None;
    }

    // <A> -> Maybe<A>.
    public static function to_maybe($a): Maybe {
      if (!$a) return new None;
      return new Just($a);
    }
  }
  ?>
