"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(run) {
        this.run = run;
    }
    static unit(f) {
        return new Effect(f);
    }
    static forEach(la, f) {
        return new Effect(() => la.map((a) => f(a).run()));
    }
    static forEach_(la, f) {
        return new Effect(() => la.forEach((a) => f(a).run()));
    }
    static when(cond, effect) {
        return new Effect(() => {
            if (cond)
                return effect.run();
            return;
        });
    }
    flatMap(f) {
        const a = this.run();
        return new Effect(() => f(a).run());
    }
    map(f) {
        return new Effect(() => f(this.run()));
    }
}
exports.Effect = Effect;
//# sourceMappingURL=effect.js.map