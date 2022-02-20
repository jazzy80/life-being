(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./slideshow":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSlideShow = void 0;
//TODO Code opschonen wellicht functioneel krijgen ipv states
function setUpSlideShow(header, prevButton, nextButton, files) {
    if (files.length == 0)
        return;
    if (files.length == 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        setImage(header, files[0]);
    }
    else {
        resetSlideShow(header, files);
        var index_1 = 0;
        prevButton.addEventListener('click', function () {
            if (index_1 == 0)
                index_1 = files.length - 1;
            else
                --index_1;
            setImage(header, files[index_1]);
        });
        nextButton.addEventListener('click', function () {
            if (index_1 == files.length - 1)
                index_1 = 0;
            else
                ++index_1;
            setImage(header, files[index_1]);
        });
    }
}
exports.setUpSlideShow = setUpSlideShow;
;
function resetSlideShow(header, files) {
    header.style.backgroundImage = "url(/life-being/".concat(files[0]);
}
function setImage(header, file) {
    header.style.backgroundImage = "url(/life-being/".concat(file, ")");
}

},{}]},{},[1,2]);
