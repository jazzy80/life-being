(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var IMAGE_DETAIL_HEIGHT = 600;
var IMAGE_LIST_WIDTH = 200;
var ATELIER = 'atelier';
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
        var imgTags = DOMEffect.forEach(images, createImageTagsFromUrl);
        return imgTags.flatMap(function (images) {
            var firstImage = images[0];
            return DOMEffect.when(!!firstImage, setImageSelected(firstImage).flatMap(function (_) {
                return showImage(firstImage.src);
            }).flatMap(function (_) {
                return addEventListenerToImages(images, imagesClickHandleCb).flatMap(function (_) {
                    return convertImagesToListItems(images).flatMap(function (liElements) {
                        return DOMEffect.unit(function () { return atelierList.append.apply(atelierList, liElements); });
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
    var atelierImage = DOMEffect.unit(function () { return document.createElement('img'); });
    return atelierImage.map(function (image) {
        image.src = url;
        image.width = IMAGE_LIST_WIDTH;
        return image;
    });
}
function convertImagesToListItems(images) {
    return DOMEffect.forEach(images, function (image) {
        return DOMEffect.unit(function () { return document.createElement('li'); }).map(function (liElement) {
            liElement.classList.add(IMAGE_LIST_ELEMENT);
            liElement.appendChild(image);
            return liElement;
        });
    });
}
function addEventListenerToImages(images, cb) {
    return DOMEffect.forEach_(images, function (i) { return DOMEffect.unit(function () { return i.addEventListener('click', function () { return cb(i, images).run(); }); }); });
}
function setImageSelected(image) {
    return DOMEffect.unit(function () { return image.classList.add(IMAGE_SELECTED); });
}
function removeSelectedFromImages(image, images) {
    return DOMEffect.forEach_(images.filter(function (i) { return i !== image; }), function (i) { return DOMEffect.unit(function () { return i.classList.remove(IMAGE_SELECTED); }); });
}
function showImage(url) {
    return DOMEffect.unit(function () { return document.querySelector(".".concat(IMAGE_DETAIL)); }).flatMap(function (imageContainer) {
        return DOMEffect.unit(function () { return document.createElement('img'); }).map(function (image) {
            image.classList.add(IMAGE_DETAIL);
            image.height = IMAGE_DETAIL_HEIGHT;
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
var DOMEffect = /** @class */ (function () {
    function DOMEffect(run) {
        this.run = run;
    }
    DOMEffect.unit = function (f) {
        return new DOMEffect(f);
    };
    DOMEffect.forEach = function (la, f) {
        return new DOMEffect(function () { return la.map(function (a) { return f(a).run(); }); });
    };
    DOMEffect.forEach_ = function (la, f) {
        return new DOMEffect(function () { return la.forEach(function (a) { return f(a).run(); }); });
    };
    DOMEffect.when = function (cond, effect) {
        return new DOMEffect(function () {
            if (cond)
                return effect.run();
            return;
        });
    };
    DOMEffect.prototype.flatMap = function (f) {
        var a = this.run();
        return new DOMEffect(function () { return f(a).run(); });
    };
    DOMEffect.prototype.map = function (f) {
        var _this = this;
        return new DOMEffect(function () { return f(_this.run()); });
    };
    return DOMEffect;
}());

},{}]},{},[1]);
