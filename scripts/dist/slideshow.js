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
    //TODO maybe a fallback image if the http request failes.
    files.then(function (resp) { return resp.json(); }).then(function (_a) {
        var rawImages = _a.imageFiles;
        // Precache images in the browser.
        var images = rawImages.map(preCacheImage);
        // No images, nothing to do
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
        // Set up the vanshing buttons effect. Start the hiding effect.
        manipulateButtons(buttons, ButtonMode.HIDE);
        // Show the gallery buttons when entering the heading area.
        header.addEventListener('mouseenter', function () {
            manipulateButtons(buttons, ButtonMode.SHOW);
        });
        // Smooth vanishing when leaving the header with the mouse.
        header.addEventListener('mouseleave', function () {
            manipulateButtons(buttons, ButtonMode.HIDE);
        });
    }
}
// General image setter function.
function setImage(header, image) {
    header.style.backgroundImage = "url(" + image.src + ")";
}
// TODO somehow make this work in clean code.
var IntervalQueue = /** @class */ (function () {
    function IntervalQueue() {
        this.intervalQueue = [];
    }
    IntervalQueue.prototype.addTimer = function (timer) { this.intervalQueue.push(timer); };
    IntervalQueue.prototype.removeAll = function () { this.intervalQueue.forEach(function (t) { return clearTimeout(t); }); this.intervalQueue.length = 0; };
    IntervalQueue.prototype.isEmpty = function () { return this.intervalQueue.length === 0; };
    return IntervalQueue;
}());
var intervalQueue = new IntervalQueue;
function manipulateButtons(buttons, mode) {
    // Start opacity as 0 if the buttons need to be shown else start at 1.
    var opacity = mode === ButtonMode.SHOW ? 0.0 : 1.0;
    // Hide after 3s but start showing immediately.
    var timeoutTime = mode === ButtonMode.HIDE ? 2000 : 1;
    // Define a isDone, for a shown button the opacity is 1 for a hidden the button, it should be 0.
    var isDone = function (value) { return mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0; };
    // Outer timeout makes sure the vanishing of buttons goes after T seconds.
    intervalQueue.removeAll();
    var timeoutTimer = setTimeout(function () {
        var timer = setInterval(function () {
            opacity = mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1;
            buttons.forEach(function (b) { return b.style.opacity = opacity.toString(); });
            if (isDone(opacity))
                clearInterval(timer);
        }, 30);
        intervalQueue.removeAll();
    }, timeoutTime);
    intervalQueue.addTimer(timeoutTimer);
}
