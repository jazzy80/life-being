"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSlideShow = void 0;
//TODO Code opschonen wellicht functioneel krijgen ipv states
function setUpSlideShow() {
    var header = document.querySelector('.header');
    var prevButton = document.querySelector('.prev-button');
    var nextButton = document.querySelector('.next-button');
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
        // Load the fist image
        initSlideShow(header, images);
        // If there is one image, hide the gallery buttons
        if (images.length === 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
        else {
            // Next and previous buttons can cycle through the images by manipulating
            // an index pointer, the gallery is cyclic.
            // TODO Not quite satisfied with the implementation(code duplication).
            var index_1 = 0;
            prevButton.addEventListener('click', function () {
                // if the index is at zero, start at the end
                index_1 = index_1 === 0 ? images.length - 1 : index_1 - 1;
                setImage(header, images[index_1]);
            });
            nextButton.addEventListener('click', function () {
                // if the index is at the end, start at the beginning.
                index_1 = index_1 === images.length - 1 ? 0 : index_1 + 1;
                setImage(header, images[index_1]);
            });
        }
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
function initSlideShow(header, images) {
    if (images.length > 0) {
        header.style.backgroundImage = "url(" + images[0].src;
    }
}
// General image setter function.
function setImage(header, image) {
    header.style.backgroundImage = "url(" + image.src + ")";
}
