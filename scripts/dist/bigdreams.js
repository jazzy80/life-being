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
function fetchImages(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/wp-json/api/atelier/?category=big-dreams&page=${page}`);
        const body = yield response.json();
        const images = body.images;
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
fetchImages(0).then((effect) => effect.run());
