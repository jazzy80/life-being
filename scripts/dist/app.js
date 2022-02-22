(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slideshow_1 = require("./slideshow");
var header = document.querySelector('.header');
var prevButton = document.querySelector('.prev-button');
var nextButton = document.querySelector('.next-button');
var page = window.location.href.split('/')[4] || 'home';
var files = fetch("/gallery/?page=" + page);
files.then(function (resp) { return resp.json(); }).then(function (json) {
    if (header && prevButton && nextButton)
        slideshow_1.setUpSlideShow(header, prevButton, nextButton, json.imageFiles.map(function (f) {
            var image = new Image();
            image.src = f;
            return image;
        }));
});

},{"./slideshow":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSlideShow = void 0;
//TODO Code opschonen wellicht functioneel krijgen ipv states
function setUpSlideShow(header, prevButton, nextButton, images) {
    console.log(images);
    if (images.length == 0)
        return;
    if (images.length == 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        setImage(header, images[0]);
    }
    else {
        resetSlideShow(header, images);
        var index_1 = 0;
        prevButton.addEventListener('click', function () {
            if (index_1 == 0)
                index_1 = images.length - 1;
            else
                --index_1;
            setImage(header, images[index_1]);
        });
        nextButton.addEventListener('click', function () {
            if (index_1 == images.length - 1)
                index_1 = 0;
            else
                ++index_1;
            setImage(header, images[index_1]);
        });
    }
}
exports.setUpSlideShow = setUpSlideShow;
;
function resetSlideShow(header, images) {
    header.style.backgroundImage = "url(" + images[0].src;
}
function setImage(header, image) {
    header.style.backgroundImage = "url(" + image.src + ")";
}

},{}]},{},[2,1]);
