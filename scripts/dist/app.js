(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slideshow_1 = require("./slideshow");
slideshow_1.setUpSlideShow();

},{"./slideshow":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSlideShow = void 0;
// Simple enum to specifiy if the buttons need to be hidden or displayed.
var ButtonMode;
(function (ButtonMode) {
    ButtonMode[ButtonMode["SHOW"] = 0] = "SHOW";
    ButtonMode[ButtonMode["HIDE"] = 1] = "HIDE";
})(ButtonMode || (ButtonMode = {}));
function setUpSlideShow() {
    var header = document.querySelector('.header');
    var prevButton = document.querySelector('.prev-button');
    var nextButton = document.querySelector('.next-button');
    var buttons = [prevButton, nextButton];
    // Get the current page by stripping slashes from the path.
    // e.g. /currentPage/ becomes currentPage.
    var page = /[A-Za-z-_]+/.exec(window.location.pathname);
    // If there is nothing after the hostName default to home.
    var files = fetch("/gallery/?page=" + (page || "home"));
    files.then(function (resp) { return resp.json(); }).then(function (_a) {
        var rawImages = _a.imageFiles;
        // Precache images in the browser.
        var images = rawImages.map(preCacheImage);
        // No images, nothing to do, TODO show a default image.
        if (images.length === 0)
            return;
        // Load the fist image, set some eventListeners for the vanishing gallery buttons effect.
        initSlideShow(header, buttons, images);
        // Next and previous buttons can cycle through the images by manipulating
        // an index pointer, the gallery is cyclic.
        var index = 0;
        prevButton.addEventListener('click', function () {
            // if the index is at zero, start at the end
            index = index === 0 ? images.length - 1 : index - 1;
            setImage(header, images[index]);
        });
        nextButton.addEventListener('click', function () {
            // if the index is at the end, start at the beginning.
            index = index === images.length - 1 ? 0 : index + 1;
            setImage(header, images[index]);
        });
    });
}
exports.setUpSlideShow = setUpSlideShow;
;
// Wrapping the imageNames into a Image obj forces the browser to precache the images.
function preCacheImage(image) {
    var prefetchImage = new Image;
    prefetchImage.src = "/" + image;
    return prefetchImage;
}
// Initialize the gallery/slideshow with the first image
function initSlideShow(header, buttons, images) {
    if (images.length > 0) {
        header.style.backgroundImage = "url(" + images[0].src;
    }
    // Buttons should be visible and initialized when there are 2 or more buttons.
    if (images.length > 1) {
        buttons.forEach(function (b) { return b.style.display = 'block'; });
        // Set up the vanshing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with timer, we need to keep track of the current Ono
        // because only one can be active, it another one becomes active, cancel the previous one.
        var currentActiveTimers_1 = [];
        if (document.querySelector('.header:hover') === null) {
            manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers_1);
        }
        // Show the gallery buttons when entering the heading area.
        header.addEventListener('mouseenter', function () {
            manipulateButtons(buttons, ButtonMode.SHOW, currentActiveTimers_1);
        });
        // Smooth vanishing when leaving the header with the mouse.
        header.addEventListener('mouseleave', function () {
            manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers_1);
        });
    }
}
// General image setter function.
function setImage(header, image) {
    header.style.backgroundImage = "url(" + image.src + ")";
}
function manipulateButtons(buttons, mode, currentActiveTimers) {
    // Start opacity as 0 if the buttons need to be shown else start at 1.
    var opacity = mode === ButtonMode.SHOW ? 0.0 : 1.0;
    // Hide after 3s but start showing immediately.
    var timeoutTime = mode === ButtonMode.HIDE ? 2000 : 1;
    // Define a isDone, for a shown button the opacity is 1 for a hidden the button, it should be 0.
    var isDone = function (value) { return mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0; };
    // Kill the current active timers if activated, so that only one will always be running.
    currentActiveTimers.forEach(function (timer) { return clearTimeout(timer); });
    currentActiveTimers.length = 0;
    // Outer timeout makes sure the vanishing of buttons goes after T seconds.
    var timeoutTimer = setTimeout(function () {
        var timer = setInterval(function () {
            opacity = mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1;
            buttons.forEach(function (b) { return b.style.opacity = opacity.toString(); });
            if (isDone(opacity))
                clearInterval(timer);
        }, 30);
    }, timeoutTime);
    // mark this timer as active.
    currentActiveTimers.push(timeoutTimer);
}

},{}]},{},[1,2]);
