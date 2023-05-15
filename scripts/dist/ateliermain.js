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
const atelierImageList = "atelier-image-list";
const imageDetail = "zoom-image";
const imageListElement = "image-list-item";
const imageSelected = "image-selected";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const atelierList = document.querySelector(`.${atelierImageList}`);
        const categoryParam = generateCategoryParam();
        const response = yield fetch(`/wp-json/api/atelier/${categoryParam}`);
        const body = yield response.json();
        const images = body.images;
        const imgTags = effect_1.Effect.forEach(images, createImageTagsFromUrl);
        return imgTags.flatMap((images) => {
            const [firstImage] = images;
            return effect_1.Effect.when(Boolean(firstImage), setImageSelected(firstImage)
                .flatMap(() => showImage(firstImage.src))
                .flatMap(() => addEventListenerToImages(images, imagesClickHandleCb).flatMap(() => convertImagesToListItems(images).flatMap((liElements) => effect_1.Effect.unit(() => {
                atelierList.append(...liElements);
            })))));
        });
    });
}
function imagesClickHandleCb(image, images) {
    return removeSelectedFromImages(image, images).flatMap(() => setImageSelected(image).flatMap(() => showImage(image.src)));
}
function createImageTagsFromUrl(url) {
    const atelierImage = effect_1.Effect.unit(() => document.createElement("img"));
    return atelierImage.map((image) => {
        image.src = url;
        return image;
    });
}
function convertImagesToListItems(images) {
    return effect_1.Effect.forEach(images, (image) => {
        return effect_1.Effect.unit(() => document.createElement("li")).map((liElement) => {
            liElement.classList.add(imageListElement);
            liElement.appendChild(image);
            return liElement;
        });
    });
}
function addEventListenerToImages(images, cb) {
    return effect_1.Effect.forEach_(images, (i) => effect_1.Effect.unit(() => {
        i.addEventListener("click", () => {
            cb(i, images).run();
        });
    }));
}
function setImageSelected(image) {
    return effect_1.Effect.unit(() => {
        image.classList.add(imageSelected, imageDetail);
    });
}
function removeSelectedFromImages(image, images) {
    return effect_1.Effect.forEach_(images.filter((i) => i !== image), (i) => effect_1.Effect.unit(() => {
        i.classList.remove(imageSelected);
    }));
}
function showImage(url) {
    return effect_1.Effect.unit(() => document.querySelector(`.${imageDetail}`)).flatMap((imageContainer) => effect_1.Effect.unit(() => document.createElement("img")).map((image) => {
        image.classList.add(imageSelected, imageDetail);
        image.src = url;
        imageContainer.innerHTML = "";
        imageContainer.appendChild(image);
    }));
}
function generateCategoryParam() {
    const categoryParam = new URLSearchParams(location.search).get("category");
    return categoryParam ? `?category=${categoryParam}` : "";
}
addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    return init().then((effect) => {
        effect.run();
    });
}));

},{"./functional/effect":2}],2:[function(require,module,exports){
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

},{}]},{},[1,2]);
