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
exports.setUpSlideShow = void 0;
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
function setUpSlideShow(galleryImageRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = document.querySelector("body");
        const prevButton = document.querySelector(".prev-button");
        const nextButton = document.querySelector(".next-button");
        const buttons = [prevButton, nextButton];
        // Get the current page as a relative path.
        // e.g. https://life-being/life-being-inspirations/art becomes
        // life-begin-inspirations/art
        // If there is nothing after the hostName, default to home.
        const currentRelativePath = getCurrentRelativePath() || "home";
        const galleryImageUrls = yield galleryImageRepository.getImages(currentRelativePath);
        // Precache images in the browser.
        const images = galleryImageUrls.map(preCacheImage);
        // Load the fist image, set some eventListeners for the vanishing gallery buttons effect.
        initSlideShow(body, buttons, images);
        // Next and previous buttons can cycle through the images by manipulating
        // an index pointer, the gallery is cyclic.
        let index = 0;
        const cycleImage = (cycleMode) => {
            // If cycling forwards through the gallery
            if (cycleMode === GalleryCycleMode.FORWARD) {
                //  if at the end of the gallery, start at the front, else just go to the next image.
                index = index === images.length - 1 ? 0 : index + 1;
            }
            // if cycling backwards through the gallery.
            else {
                //  if at the start of the gallery, go the end, else go to the previous image.
                index = index === 0 ? images.length - 1 : index - 1;
            }
            setImage(body, images[index]);
        };
        prevButton.addEventListener("click", () => {
            cycleImage(GalleryCycleMode.BACKWARD);
        });
        nextButton.addEventListener("click", () => {
            cycleImage(GalleryCycleMode.FORWARD);
        });
    });
}
exports.setUpSlideShow = setUpSlideShow;
function getCurrentRelativePath() {
    return window.location.pathname
        .split("/")
        // url must be a non-empty string.
        .filter((url) => url !== undefined && url !== "")
        .join("/");
}
// Wrapping the imageRul into an Image element's src attribute, forces the browser to precache the images.
function preCacheImage(imageUrl) {
    const prefetchImage = new Image();
    prefetchImage.src = imageUrl;
    return prefetchImage;
}
// Initialize the gallery/slideshow with the first image
function initSlideShow(body, buttons, images) {
    // Initialize the gallery using the first image in the `images` array.
    if (images.length > 0) {
        body.style.backgroundImage = `url(${images[0].src}`;
    }
    // Buttons should be visible and initialized when there are 2 or more images.
    if (images.length > 1) {
        buttons.forEach((b) => (b.style.display = "block"));
        // Set up the vanishing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with a timer, we need to keep track of the current one,
        // because only one can be active, if another one becomes active, cancel the previous one.
        const currentActiveTimers = [];
        if (document.querySelector(".header:hover") === null) {
            manipulateButtons(buttons, ButtonMode.HIDE, currentActiveTimers);
        }
        // Show the gallery buttons when entering the header area.
        const header = body.querySelector(".header");
        if (header !== null) {
            header.addEventListener("mouseenter", () => {
                manipulateButtons(buttons, ButtonMode.SHOW, currentActiveTimers);
            });
            // Smooth vanishing when leaving the header with the mouse.
            header.addEventListener("mouseleave", () => {
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
    let opacity = mode === ButtonMode.SHOW ? 0.0 : 1.0;
    // Hide after 2s but start showing immediately.
    const timeoutTime = mode === ButtonMode.HIDE ? 2000 : 1;
    // Define a isDone func, for a button that is being shown,
    // the animation is done when opacity reaches 1.0, else when the button is being
    // vanished, the animation is done when opacity reaches 0.0.
    const isDone = (value) => mode === ButtonMode.SHOW ? value >= 1.0 : value <= 0.0;
    // Kill the current active timers if activated, so that only one will always be running.
    currentActiveTimers.forEach((timer) => clearTimeout(timer));
    currentActiveTimers.length = 0;
    // Outer timeout makes sure the vanishing of buttons goes after T seconds.
    const timeoutTimer = setTimeout(() => {
        const timer = setInterval(() => {
            opacity = mode === ButtonMode.SHOW ? opacity + 0.1 : opacity - 0.1;
            buttons.forEach((b) => (b.style.opacity = opacity.toString()));
            // Clear the timer when the fading animation is done.
            if (isDone(opacity))
                clearInterval(timer);
        }, 30);
    }, timeoutTime);
    // Mark this timer as active. Keep track of it.
    currentActiveTimers.push(timeoutTimer);
}
//# sourceMappingURL=slideshow.js.map