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
    var body = document.querySelector('body');
    var prevButton = document.querySelector('.prev-button');
    var nextButton = document.querySelector('.next-button');
    var buttons = [prevButton, nextButton];
    // Get the current page as a relative path.
    // e.g. https://life-being/life-being-inspirations/art becomes
    // life-begin-inspirations/art
    var page = window.location.pathname
        .split('/')
        // url must be a non-empty string.
        .filter(function (url) { return url !== undefined || url !== ''; })
        .join('/')
        .replace(/^\/$/, 'home');
    // If there is nothing after the hostName default to home.
    var files = fetch("/gallery/?page=" + (page || "home"));
    files.then(function (resp) { return resp.json(); }).then(function (_a) {
        var rawImages = _a.imageFiles;
        // No images, nothing to do, TODO show a default image.
        if (rawImages.length === 0)
            return;
        // Precache images in the browser.
        var images = rawImages.map(preCacheImage);
        // Load the fist image, set some eventListeners for the vanishing gallery buttons effect.
        initSlideShow(body, buttons, images);
        // Next and previous buttons can cycle through the images by manipulating
        // an index pointer, the gallery is cyclic.
        var index = 0;
        var cycleImage = function (cycleMode) {
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
        prevButton.addEventListener('click', function () {
            cycleImage(GalleryCycleMode.BACKWARD);
        });
        nextButton.addEventListener('click', function () {
            cycleImage(GalleryCycleMode.FORWARD);
        });
    });
}
exports.setUpSlideShow = setUpSlideShow;
;
// Wrapping the imageNames into a Image obj forces the browser to precache the images.
function preCacheImage(imageUrl) {
    var prefetchImage = new Image;
    prefetchImage.src = "/" + imageUrl;
    return prefetchImage;
}
// Initialize the gallery/slideshow with the first image
function initSlideShow(body, buttons, images) {
    // Initialize the gallery using the first image in the `images` array.
    if (images.length > 0) {
        body.style.backgroundImage = "url(" + images[0].src;
    }
    // Buttons should be visible and initialized when there are 2 or more buttons.
    if (images.length > 1) {
        buttons.forEach(function (b) { return b.style.display = 'block'; });
        // Set up the vanshing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with a timer, we need to keep track of the current One,
        // because only one can be active, it another one becomes active, cancel the previous one.
        var currentActiveTimers_1 = [];
        if (document.querySelector('.header:hover') === null) {
            manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers_1);
        }
        // Show the gallery buttons when entering the header area.
        var header = body.querySelector('.header');
        if (header !== null) {
            header.addEventListener('mouseenter', function () {
                manipulateButtons(buttons, ButtonMode.SHOW, currentActiveTimers_1);
            });
            // Smooth vanishing when leaving the header with the mouse.
            header.addEventListener('mouseleave', function () {
                manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers_1);
            });
        }
    }
}
// General image setter function.
function setImage(header, image) {
    header.style.backgroundImage = "url(" + image.src + ")";
}
function manipulateButtons(buttons, mode, currentActiveTimers) {
    // Start opacity as 0 if the buttons need to be shown else start at 1.
    var opacity = (mode === ButtonMode.SHOW ? 0.0 : 1.0);
    // Hide after 2s but start showing immediately.
    var timeoutTime = (mode === ButtonMode.HIDE ? 2000 : 1);
    // Define a isDone func, for a button that is beign shown,
    // the animation is done whem opacity reaches 1.0, else when the button is being
    // vanished, the animation is done when opacity reaches 0.0.
    var isDone = function (value) { return mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0; };
    // Kill the current active timers if activated, so that only one will always be running.
    currentActiveTimers.forEach(function (timer) { return clearTimeout(timer); });
    currentActiveTimers.length = 0;
    // Outer timeout makes sure the vanishing of buttons goes after T seconds.
    var timeoutTimer = setTimeout(function () {
        var timer = setInterval(function () {
            opacity = (mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1);
            buttons.forEach(function (b) { return b.style.opacity = opacity.toString(); });
            // Clear the timer when the fading animation is done.
            if (isDone(opacity))
                clearInterval(timer);
        }, 30);
    }, timeoutTime);
    // mark this timer as active. Keep track of it.
    currentActiveTimers.push(timeoutTimer);
}
