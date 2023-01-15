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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let currentPage = 0;
        const category = generateCategoryParam();
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");
        setTitle(category.split("=")[1]);
        setUpPage(category, currentPage, [prevButton, nextButton]);
        prevButton.addEventListener("click", () => {
            setUpPage(category, --currentPage, [prevButton, nextButton]);
        });
        nextButton.addEventListener("click", () => {
            setUpPage(category, ++currentPage, [prevButton, nextButton]);
        });
    });
}
function setUpPage(category, currentPage, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield fetchImages(category, currentPage);
        const imageSrcs = body.images;
        const paginationSize = body.paginationSize;
        const amountOfPages = imageSrcs.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
        const imageContainer = document.querySelector(".bigdreams-images");
        imageContainer.innerHTML = "";
        setPaginationText(currentPage, imageSrcs.length, body.count, paginationSize);
        setButtons(buttons, currentPage, amountOfPages);
        imageSrcs
            .map(createImageFromSrc)
            .forEach((image) => imageContainer.appendChild(image));
    });
}
function fetchImages(category, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/wp-json/api/atelier/${category}&page=${page}`);
        return response.json();
    });
}
function setPaginationText(currentPage, items, count, paginationSize) {
    const paginationText = document.querySelector(".pagination-text");
    const min = currentPage * paginationSize + 1;
    const max = min + items - 1;
    paginationText.textContent = `Foto's ${min} t/m ${max} getoond van de ${count}`;
}
function setButtons(buttons, currentPage, amountOfPages) {
    const [prev, next] = buttons;
    enableButton(prev);
    enableButton(next);
    if (currentPage === 0)
        disableButton(prev);
    if (currentPage === amountOfPages - 1)
        disableButton(next);
    buttons.forEach((b) => (b.style.visibility = "visible"));
}
function disableButton(button) {
    button.classList.add("paginator-btn-disabled");
    button.disabled = true;
}
function enableButton(button) {
    button.classList.remove("paginator-btn-disabled");
    button.disabled = false;
}
function setTitle(category) {
    const title = category.replace(/-/g, " ");
    const titleElement = document.querySelector(".bigdreams-title");
    titleElement.textContent = title;
}
function createImageFromSrc(src) {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    const imageText = document.createElement("span");
    const image = new Image();
    imageFrame.append(image);
    image.src = src;
    return imageFrame;
}
function generateCategoryParam() {
    const categoryParam = new URLSearchParams(location.search).get("category");
    return categoryParam ? `?category=${categoryParam}` : "";
}
init();

},{}]},{},[1]);
