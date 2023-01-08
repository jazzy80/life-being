(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const effect_1 = require("./functional/effect");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/wp-json/api/atelier/?category=big-dreams&page=0");
        const images = yield response.json();
        return effect_1.Effect.forEach_(images, (imageSrc) => createImage(imageSrc)
            .map((image) => {
            const imageContainer = document.querySelector(".bigdreams-images");
            imageContainer.append(image);
        })
            .flatMap(() => setPaginationText(images.length))
            .flatMap(() => setButtons()));
    });
}
function setPaginationText(count) {
    return effect_1.Effect.unit(() => document.querySelector(".pagination-text")).map((paginationText) => {
        paginationText.textContent = `Foto's 1 t/m 9 getoond van de ${count}`;
    });
}
function setButtons() {
    return effect_1.Effect.unit(() => document.querySelector(".prev-btn")).map((button) => {
        button.classList.add("paginator-btn-disabled");
        button.disabled = true;
    });
}
function createImage(src) {
    return effect_1.Effect.unit(() => {
        const imageFrame = document.createElement("div");
        imageFrame.classList.add("image-frame");
        return imageFrame;
    }).flatMap((imageFrame) => {
        const imageText = document.createElement("span");
        return effect_1.Effect.unit(() => {
            const image = document.createElement("img");
            image.src = src;
            imageFrame.append(imageText, image);
            return imageFrame;
        });
    });
}
init().then((effect) => effect.run((x) => x));

},{"./functional/effect":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(run) {
        this.run = run;
    }
    static unit(value) {
        return new Effect((cb) => cb(value()));
    }
    static forEach(la, f) {
        return la.reduce((effect, a) => effect.flatMap((b) => f(a).map((b2) => [...b, b2])), Effect.unit(() => []));
    }
    static forEach_(la, f) {
        return new Effect(() => la.forEach((a) => f(a).run((x) => x)));
    }
    static when(cond, effect) {
        return new Effect((cb) => {
            if (cond)
                return effect.run(cb);
            return;
        });
    }
    flatMap(f) {
        return new Effect((cb) => this.run((a) => f(a).run(cb)));
    }
    map(f) {
        return new Effect((cb) => this.run((a) => cb(f(a))));
    }
}
exports.Effect = Effect;

},{}]},{},[1,2]);
