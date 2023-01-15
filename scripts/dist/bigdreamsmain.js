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
        const prevButtons = document.querySelectorAll(".prev-btn");
        const nextButtons = document.querySelectorAll(".next-btn");
        setUpPage(currentPage, [prevButtons, nextButtons]);
        prevButtons.forEach((prevButton) => {
            prevButton.addEventListener("click", () => {
                setUpPage(--currentPage, [prevButtons, nextButtons]);
            });
        });
        nextButtons.forEach((nextButton) => {
            nextButton.addEventListener("click", () => {
                setUpPage(++currentPage, [prevButtons, nextButtons]);
            });
        });
    });
}
function setUpPage(currentPage, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield fetchImages(currentPage);
        const imageSrcs = body.images;
        const amountOfPages = imageSrcs.length === 0 ? 0 : Math.ceil(body.count / 9);
        const imageContainer = document.querySelector(".bigdreams-images");
        imageContainer.innerHTML = "";
        const loader = document.querySelector(".loader");
        const content = document.querySelector(".content");
        loader.style.display = "block";
        content.style.display = "none";
        setPaginationText(currentPage, imageSrcs.length, body.count);
        setButtons(buttons, currentPage, amountOfPages);
        const images = yield Promise.all(imageSrcs.map(createImageFromSrc));
        images.forEach((image) => imageContainer.appendChild(image));
        loader.style.display = "none";
        content.style.display = "flex";
    });
}
function fetchImages(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/wp-json/api/atelier/?category=big-dreams&page=${page}`);
        return response.json();
    });
}
function setPaginationText(currentPage, items, count) {
    const paginationText = document.querySelector(".pagination-text");
    const min = currentPage * 9 + 1;
    const max = min + items - 1;
    paginationText.textContent = `Foto's ${min} t/m ${max} getoond van de ${count}`;
}
function setButtons(buttons, currentPage, amountOfPages) {
    const [prevs, nexts] = buttons;
    prevs.forEach((prev) => {
        enableButton(prev);
        if (currentPage === 0)
            disableButton(prev);
    });
    nexts.forEach((next) => {
        enableButton(next);
        if (currentPage === amountOfPages - 1)
            disableButton(next);
    });
}
function disableButton(button) {
    button.classList.add("paginator-btn-disabled");
    button.style.visibility = "hidden";
}
function enableButton(button) {
    button.classList.remove("paginator-btn-disabled");
    button.style.visibility = "visible";
}
function createImageFromSrc(src) {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    const imageText = document.createElement("span");
    const image = new Image();
    imageFrame.append(image);
    return new Promise((resolve) => {
        image.src = src;
        image.onload = () => {
            resolve(imageFrame);
        };
    });
}
init();

},{}]},{},[1]);
