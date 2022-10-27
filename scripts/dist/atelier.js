"use strict";
var IMAGE_DETAIL_HEIGHT = 600;
var IMAGE_LIST_WIDTH = 200;
var ATELIER = 'atelier';
var ATELIER_IMAGE_LIST = 'atelier-image-list';
var IMAGE_DETAIL = 'zoom-image';
var IMAGE_LIST_ELEMENT = 'image-list-item';
var IMAGE_SELECTED = 'image-selected';
fetch('/wp-json/api/atelier/')
    .then(function (response) { return response.json(); })
    .then(function (images) {
    var imgTags = images.map(createImageTagsFromUrl);
    createImageList(imgTags);
});
function createImageList(images) {
    var atelierContainer = document.querySelector(".".concat(ATELIER));
    var atelierList = document.querySelector(".".concat(ATELIER_IMAGE_LIST));
    atelierContainer.appendChild(atelierList);
    images.forEach(function (image, _, arr) {
        var liElement = document.createElement('li');
        liElement.classList.add(IMAGE_LIST_ELEMENT);
        liElement.appendChild(image);
        image.addEventListener('click', function () {
            removeSelectedFromImages(image, arr);
            setImageSelected(image);
            showImage(image.src);
        });
        atelierList.appendChild(liElement);
    });
    return atelierContainer;
}
function setImageSelected(image) {
    image.classList.add(IMAGE_SELECTED);
}
function removeSelectedFromImages(image, images) {
    images.filter(function (i) { return i !== image; }).forEach(function (i) { return i.classList.remove(IMAGE_SELECTED); });
}
function createImageTagsFromUrl(url) {
    var atelierImage = document.createElement('img');
    atelierImage.src = url;
    atelierImage.width = IMAGE_LIST_WIDTH;
    return atelierImage;
}
function showImage(url) {
    var imageContainer = document.querySelector(".".concat(IMAGE_DETAIL));
    var image = document.createElement('img');
    image.classList.add(IMAGE_DETAIL);
    image.height = IMAGE_DETAIL_HEIGHT;
    image.src = url;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
}
