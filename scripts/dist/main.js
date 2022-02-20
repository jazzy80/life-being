"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slideshow_1 = require("./slideshow");
var header = document.querySelector('.header');
var prevButton = document.querySelector('.prev-button');
var nextButton = document.querySelector('.next-button');
var page = window.location.href.split('/')[4] || 'home';
var files = fetch("/life-being/gallery/?page=".concat(page));
files.then(function (resp) { return resp.json(); }).then(function (json) {
    if (header && prevButton && nextButton)
        (0, slideshow_1.setUpSlideShow)(header, prevButton, nextButton, json.imageFiles);
});
