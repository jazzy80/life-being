"use strict";
exports.__esModule = true;
var effect_1 = require("./functional/effect");
var IMAGE_LIST_WIDTH = 200;
var ATELIER_IMAGE_LIST = 'atelier-image-list';
var IMAGE_DETAIL = 'zoom-image';
var IMAGE_LIST_ELEMENT = 'image-list-item';
var IMAGE_SELECTED = 'image-selected';
function init() {
    var atelierList = document.querySelector(".".concat(ATELIER_IMAGE_LIST));
    var categoryParam = generateCategoryParam();
    return fetch("/wp-json/api/atelier/".concat(categoryParam))
        .then(function (response) { return response.json(); })
        .then(function (images) {
        var imgTags = effect_1.Effect.forEach(images, createImageTagsFromUrl);
        return imgTags.flatMap(function (images) {
            var firstImage = images[0];
            return effect_1.Effect.when(!!firstImage, setImageSelected(firstImage).flatMap(function (_) {
                return showImage(firstImage.src);
            }).flatMap(function (_) {
                return addEventListenerToImages(images, imagesClickHandleCb).flatMap(function (_) {
                    return convertImagesToListItems(images).flatMap(function (liElements) {
                        return effect_1.Effect.unit(function () { return atelierList.append.apply(atelierList, liElements); });
                    });
                });
            }));
        });
    });
}
function imagesClickHandleCb(image, images) {
    return removeSelectedFromImages(image, images).flatMap(function (_) {
        return setImageSelected(image).flatMap(function (_) {
            return showImage(image.src);
        });
    });
}
function createImageTagsFromUrl(url) {
    var atelierImage = effect_1.Effect.unit(function () { return document.createElement('img'); });
    return atelierImage.map(function (image) {
        image.src = url;
        image.width = IMAGE_LIST_WIDTH;
        return image;
    });
}
function convertImagesToListItems(images) {
    return effect_1.Effect.forEach(images, function (image) {
        return effect_1.Effect.unit(function () { return document.createElement('li'); }).map(function (liElement) {
            liElement.classList.add(IMAGE_LIST_ELEMENT);
            liElement.appendChild(image);
            return liElement;
        });
    });
}
function addEventListenerToImages(images, cb) {
    return effect_1.Effect.forEach_(images, function (i) { return effect_1.Effect.unit(function () { return i.addEventListener('click', function () { return cb(i, images).run(); }); }); });
}
function setImageSelected(image) {
    return effect_1.Effect.unit(function () { return image.classList.add(IMAGE_SELECTED); });
}
function removeSelectedFromImages(image, images) {
    return effect_1.Effect.forEach_(images.filter(function (i) { return i !== image; }), function (i) { return effect_1.Effect.unit(function () { return i.classList.remove(IMAGE_SELECTED); }); });
}
function showImage(url) {
    return effect_1.Effect.unit(function () { return document.querySelector(".".concat(IMAGE_DETAIL)); }).flatMap(function (imageContainer) {
        return effect_1.Effect.unit(function () { return document.createElement('img'); }).map(function (image) {
            image.classList.add(IMAGE_DETAIL);
            image.src = url;
            imageContainer.innerHTML = '';
            imageContainer.appendChild(image);
        });
    });
}
function generateCategoryParam() {
    var categoryParam = new URLSearchParams(location.search).get('category');
    return categoryParam ? "?category=".concat(categoryParam) : '';
}
init().then(function (effect) { return effect.run(); });
