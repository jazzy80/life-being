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
