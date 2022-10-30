export class Effect<A> {
  constructor(public run: () => A) {}
  static unit<A>(f: () => A): Effect<A> {
    return new Effect(f);
  }
  static forEach<A, B>(la: A[], f: (a: A) => Effect<B>): Effect<B[]> {
    return new Effect(() => la.map(a => f(a).run()));
  }
  static forEach_<A>(la: A[], f: (a: A) => Effect<void>): Effect<void> {
    return new Effect(() => la.forEach(a => f(a).run()));
  }
  static when(cond: boolean, effect: Effect<void>): Effect<void> {
    return new Effect(() => {
      if (cond) return effect.run()
      return
    });
  }
  flatMap<B>(f: (a: A) => Effect<B>): Effect<B> {
    const a = this.run();
    return new Effect(
      () => f(a).run()
    );
  }
  map<B>(f: (a: A) => B): Effect<B> {
    return new Effect(
      () => f(this.run())
    );
  }
}
