(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slideshow_1 = require("./slideshow");
(0, slideshow_1.setUpSlideShow)();

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
var GalleryCycleMode;
(function (GalleryCycleMode) {
    GalleryCycleMode[GalleryCycleMode["FORWARD"] = 0] = "FORWARD";
    GalleryCycleMode[GalleryCycleMode["BACKWARD"] = 1] = "BACKWARD";
})(GalleryCycleMode || (GalleryCycleMode = {}));
function setUpSlideShow() {
    const body = document.querySelector('body');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const buttons = [prevButton, nextButton];
    // Get the current page as a relative path.
    // e.g. https://life-being/life-being-inspirations/art becomes
    // life-begin-inspirations/art
    const page = window.location.pathname
        .split('/')
        // url must be a non-empty string.
        .filter((url) => url !== undefined || url !== '')
        .join('/')
        .replace(/^\/$/, '/home/');
    // If there is nothing after the hostName default to home.
    const files = fetch(`/wp-json/api/gallery-images/?page=${page || "home"}`);
    files.then(resp => resp.json()).then(({ imageFiles: rawImages }) => {
        // No images, nothing to do, TODO show a default image.
        if (rawImages.length === 0)
            return;
        // Precache images in the browser.
        const images = rawImages.map(preCacheImage);
        // Load the fist image, set some eventListeners for the vanishing gallery buttons effect.
        initSlideShow(body, buttons, images);
        // Next and previous buttons can cycle through the images by manipulating
        // an index pointer, the gallery is cyclic.
        let index = 0;
        const cycleImage = (cycleMode) => {
            // If cycling forwards through the gallery
            if (cycleMode === GalleryCycleMode.FORWARD) {
                //  if at the end of the gallery, start at the front, else just go to the next image.
                index = (index === images.length - 1 ? 0 : index + 1);
            }
            // if cycling backwards through the gallery.
            else {
                //  if at the start of the gallery, go the the end, else go to the previous image.
                index = (index === 0 ? images.length - 1 : index - 1);
            }
            setImage(body, images[index]);
        };
        prevButton.addEventListener('click', () => {
            cycleImage(GalleryCycleMode.BACKWARD);
        });
        nextButton.addEventListener('click', () => {
            cycleImage(GalleryCycleMode.FORWARD);
        });
    });
}
exports.setUpSlideShow = setUpSlideShow;
;
// Wrapping the imageNames into a Image obj forces the browser to precache the images.
function preCacheImage(imageUrl) {
    const prefetchImage = new Image;
    prefetchImage.src = imageUrl;
    return prefetchImage;
}
// Initialize the gallery/slideshow with the first image
function initSlideShow(body, buttons, images) {
    // Initialize the gallery using the first image in the `images` array.
    if (images.length > 0) {
        body.style.backgroundImage = `url(${images[0].src}`;
    }
    // Buttons should be visible and initialized when there are 2 or more buttons.
    if (images.length > 1) {
        buttons.forEach(b => b.style.display = 'block');
        // Set up the vanshing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with a timer, we need to keep track of the current One,
        // because only one can be active, it another one becomes active, cancel the previous one.
        let currentActiveTimers = [];
        if (document.querySelector('.header:hover') === null) {
            manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers);
        }
        // Show the gallery buttons when entering the header area.
        const header = body.querySelector('.header');
        if (header !== null) {
            header.addEventListener('mouseenter', () => {
                manipulateButtons(buttons, ButtonMode.SHOW, currentActiveTimers);
            });
            // Smooth vanishing when leaving the header with the mouse.
            header.addEventListener('mouseleave', () => {
                manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers);
            });
        }
    }
}
// General image setter function.
function setImage(header, image) {
    header.style.backgroundImage = `url(${image.src})`;
}
function manipulateButtons(buttons, mode, currentActiveTimers) {
    // Start opacity as 0 if the buttons need to be shown else start at 1.
    let opacity = (mode === ButtonMode.SHOW ? 0.0 : 1.0);
    // Hide after 2s but start showing immediately.
    const timeoutTime = (mode === ButtonMode.HIDE ? 2000 : 1);
    // Define a isDone func, for a button that is beign shown,
    // the animation is done whem opacity reaches 1.0, else when the button is being
    // vanished, the animation is done when opacity reaches 0.0.
    const isDone = (value) => mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0;
    // Kill the current active timers if activated, so that only one will always be running.
    currentActiveTimers.forEach(timer => clearTimeout(timer));
    currentActiveTimers.length = 0;
    // Outer timeout makes sure the vanishing of buttons goes after T seconds.
    const timeoutTimer = setTimeout(() => {
        const timer = setInterval(() => {
            opacity = (mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1);
            buttons.forEach(b => b.style.opacity = opacity.toString());
            // Clear the timer when the fading animation is done.
            if (isDone(opacity))
                clearInterval(timer);
        }, 30);
    }, timeoutTime);
    // mark this timer as active. Keep track of it.
    currentActiveTimers.push(timeoutTimer);
}

},{}]},{},[1,2]);
