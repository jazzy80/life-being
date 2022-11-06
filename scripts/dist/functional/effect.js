"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
var Effect = /** @class */ (function () {
    function Effect(run) {
        this.run = run;
    }
    Effect.unit = function (f) {
        return new Effect(f);
    };
    Effect.forEach = function (la, f) {
        return new Effect(function () { return la.map(function (a) { return f(a).run(); }); });
    };
    Effect.forEach_ = function (la, f) {
        return new Effect(function () { return la.forEach(function (a) { return f(a).run(); }); });
    };
    Effect.when = function (cond, effect) {
        return new Effect(function () {
            if (cond)
                return effect.run();
            return;
        });
    };
    Effect.prototype.flatMap = function (f) {
        var a = this.run();
        return new Effect(function () { return f(a).run(); });
    };
    Effect.prototype.map = function (f) {
        var _this = this;
        return new Effect(function () { return f(_this.run()); });
    };
    return Effect;
}());
exports.Effect = Effect;
