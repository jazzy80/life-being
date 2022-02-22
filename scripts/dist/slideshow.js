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
