(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports.Api = void 0;
exports.Api = {
    baseUrl: "/wp-json/api/",
    GET(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.baseUrl}${url}`);
        });
    }
};

},{}],2:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slideshow_1 = require("./slideshow");
slideshow_1.setUpSlideShow();

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
    const body = document.querySelector("body");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const buttons = [prevButton, nextButton];
    // Get the current page as a relative path.
    // e.g. https://life-being/life-being-inspirations/art becomes
    // life-begin-inspirations/art
    const page = window.location.pathname
        .split("/")
        // url must be a non-empty string.
        .filter((url) => url !== undefined && url !== "")
        .join("/");
    // If there is nothing after the hostName default to home.
    const files = fetch(`/wp-json/api/gallery-images/?page=${page || "home"}`);
    files
        .then((resp) => resp.json())
        .then(({ imageFiles: rawImages }) => {
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
                index = index === images.length - 1 ? 0 : index + 1;
            }
            // if cycling backwards through the gallery.
            else {
                //  if at the start of the gallery, go the the end, else go to the previous image.
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
// Wrapping the imageNames into a Image obj forces the browser to precache the images.
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
        // Set up the vanshing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with a timer, we need to keep track of the current One,
        // because only one can be active, it another one becomes active, cancel the previous one.
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
    // Define a isDone func, for a button that is beign shown,
    // the animation is done whem opacity reaches 1.0, else when the button is being
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
    // mark this timer as active. Keep track of it.
    currentActiveTimers.push(timeoutTimer);
}

},{}]},{},[1,2]);

},{"./slideshow":26}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
const previouspage_1 = require("./classes/previouspage");
const nextpage_1 = require("./classes/nextpage");
/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
function setUpArticles(url) {
    // fetch articles and use a callback func in the resulting promise.
    fetchArticles(url, 0, (articles, count) => {
        // From the articles create a list view in the DOM.
        createListFromArticles(articles);
        const totalPages = Math.ceil(count / articles.length);
        if (count > articles.length) {
            // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(0, totalPages), new nextpage_1.NextPage(0, totalPages), 
            // refetch articles for the next or previous page, after a click.
            (pageNumber) => fetchArticles(url, pageNumber, createListFromArticles));
        }
    });
}
exports.setUpArticles = setUpArticles;
function createListFromArticles(articles) {
    const anchor = getDomAnchor();
    // Get the article list if exists else create one and
    // attach the list to the Dom via the anchor element.
    // IIF pattern is used to avoid using a mutable variable.
    const articleList = (document.querySelector('.articles') || createArticleList());
    //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.
    if (anchor && articleList.parentNode === null)
        attachElementToAnchor(articleList, anchor);
    // Make sure the list is empty at the start.
    articleList.innerHTML = '';
    // Fill the list with the actual articles.
    articles.forEach((article) => {
        const { date, excerpt, featured_image_url: imageUrl, title, url } = article;
        const articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function attachElementToAnchor(element, anchor) {
    if (anchor) {
        anchor.appendChild(element);
    }
}
function fetchArticles(url, pageNumber, callBackFn) {
    fetch(`${url}/${pageNumber}`).then((response) => response.json()).then((data) => {
        callBackFn(data.blogs, data.count);
    });
}
function getDomAnchor() {
    return document.querySelector('.entry-content');
}
function createArticleList() {
    const el = document.createElement('ul');
    el.classList.add('articles');
    return el;
}
/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(prevPage, nextPage) {
    const hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
    const hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
    const el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        `<button
    ${!hasPrevPage ? 'disabled' : ''}
    class="paginator-prev-btn ${!hasPrevPage ? 'paginator-btn-disabled' : ''}"
    >
      Prev
  </button>
   <button
    ${!hasNextPage ? 'disabled' : ''}
    class="paginator-next-btn ${!hasNextPage ? 'paginator-btn-disabled' : ''}"
  >
      Next
  </button>`;
    return el;
}
function getPaginatorButtonsContainer() {
    return document.querySelector('.paginator-btns');
}
function getPaginatorButtons(container) {
    return [
        container.querySelector('.paginator-prev-btn'),
        container.querySelector('.paginator-next-btn')
    ];
}
function createArticleListItem(articleUrl, articleTitle, articleDate, articleExcerpt, imageSource) {
    const el = document.createElement('li');
    el.classList.add('article');
    const image = imageSource
        ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
        : '';
    el.innerHTML =
        `${image}
      <div class="article-text">
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
    return el;
}
function setUpPaginatorButtons(prevPage, nextPage, fetchArticlesFn) {
    // Create a new set of prev/next buttons for the paginator.
    const buttonsContainer = createPaginatorButtonsWithContainer(prevPage, nextPage);
    // Get the previous attached buttons if they exist.
    const previousButtonsContainer = getPaginatorButtonsContainer();
    // If it already exists swap the old buttons with the new buttons to reset their state.
    // and previous attached eventlisteners.
    if (previousButtonsContainer) {
        const p = previousButtonsContainer.parentNode;
        if (p)
            p.replaceChild(buttonsContainer, previousButtonsContainer);
    }
    // Else attach the new buttons to the DOM.
    else
        attachElementToAnchor(buttonsContainer, getDomAnchor());
    // Get the individual buttons from its container.
    const buttons = getPaginatorButtons(buttonsContainer);
    const [prevButton, nextButton] = buttons;
    // Attach the event listeners.
    prevButton.addEventListener('click', getButtonEventCb(prevPage, fetchArticlesFn));
    nextButton.addEventListener('click', getButtonEventCb(nextPage, fetchArticlesFn));
}
/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(page, fetchArticlesFn) {
    return () => {
        if (page.nextPredicate(page.pageNumber)) {
            // If there is a next page available in the pagination.
            const nextPageNumber = page.nextPage(page.pageNumber);
            // Fetch the next batch of articles by the new pageNumber.
            fetchArticlesFn(nextPageNumber);
            // Update the eventlisteners with new the page information, so
            // with the next click, the correct batch of articles will be fetched.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(nextPageNumber, page.totalPages), new nextpage_1.NextPage(nextPageNumber, page.totalPages), fetchArticlesFn);
        }
    };
}

},{"./classes/nextpage":11,"./classes/previouspage":12}],4:[function(require,module,exports){
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
const effect_1 = require("./functional/effect");
const atelierImageList = "atelier-image-list";
const imageDetail = "zoom-image";
const imageListElement = "image-list-item";
const imageSelected = "image-selected";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const atelierList = document.querySelector(`.${atelierImageList}`);
        const categoryParam = generateCategoryParam();
        const response = yield fetch(`/wp-json/api/atelier/${categoryParam}`);
        const body = yield response.json();
        const images = body.images;
        const imgTags = effect_1.Effect.forEach(images, createImageTagsFromUrl);
        return imgTags.flatMap((images) => {
            const [firstImage] = images;
            return effect_1.Effect.when(Boolean(firstImage), setImageSelected(firstImage)
                .flatMap(() => showImage(firstImage.src))
                .flatMap(() => addEventListenerToImages(images, imagesClickHandleCb).flatMap(() => convertImagesToListItems(images).flatMap((liElements) => effect_1.Effect.unit(() => {
                atelierList.append(...liElements);
            })))));
        });
    });
}
function imagesClickHandleCb(image, images) {
    return removeSelectedFromImages(image, images).flatMap(() => setImageSelected(image).flatMap(() => showImage(image.src)));
}
function createImageTagsFromUrl(url) {
    const atelierImage = effect_1.Effect.unit(() => document.createElement("img"));
    return atelierImage.map((image) => {
        image.src = url;
        return image;
    });
}
function convertImagesToListItems(images) {
    return effect_1.Effect.forEach(images, (image) => {
        return effect_1.Effect.unit(() => document.createElement("li")).map((liElement) => {
            liElement.classList.add(imageListElement);
            liElement.appendChild(image);
            return liElement;
        });
    });
}
function addEventListenerToImages(images, cb) {
    return effect_1.Effect.forEach_(images, (i) => effect_1.Effect.unit(() => {
        i.addEventListener("click", () => {
            cb(i, images).run();
        });
    }));
}
function setImageSelected(image) {
    return effect_1.Effect.unit(() => {
        image.classList.add(imageSelected, imageDetail);
    });
}
function removeSelectedFromImages(image, images) {
    return effect_1.Effect.forEach_(images.filter((i) => i !== image), (i) => effect_1.Effect.unit(() => {
        i.classList.remove(imageSelected);
    }));
}
function showImage(url) {
    return effect_1.Effect.unit(() => document.querySelector(`.${imageDetail}`)).flatMap((imageContainer) => effect_1.Effect.unit(() => document.createElement("img")).map((image) => {
        image.classList.add(imageSelected, imageDetail);
        image.src = url;
        imageContainer.innerHTML = "";
        imageContainer.appendChild(image);
    }));
}
function generateCategoryParam() {
    const categoryParam = new URLSearchParams(location.search).get("category");
    return categoryParam ? `?category=${categoryParam}` : "";
}
addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    return init().then((effect) => {
        effect.run();
    });
}));

},{"./functional/effect":15}],5:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
const effect_1 = require("./functional/effect");
const atelierImageList = "atelier-image-list";
const imageDetail = "zoom-image";
const imageListElement = "image-list-item";
const imageSelected = "image-selected";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const atelierList = document.querySelector(`.${atelierImageList}`);
        const categoryParam = generateCategoryParam();
        const response = yield fetch(`/wp-json/api/atelier/${categoryParam}`);
        const body = yield response.json();
        const images = body.images;
        const imgTags = effect_1.Effect.forEach(images, createImageTagsFromUrl);
        return imgTags.flatMap((images) => {
            const [firstImage] = images;
            return effect_1.Effect.when(Boolean(firstImage), setImageSelected(firstImage)
                .flatMap(() => showImage(firstImage.src))
                .flatMap(() => addEventListenerToImages(images, imagesClickHandleCb).flatMap(() => convertImagesToListItems(images).flatMap((liElements) => effect_1.Effect.unit(() => {
                atelierList.append(...liElements);
            })))));
        });
    });
}
function imagesClickHandleCb(image, images) {
    return removeSelectedFromImages(image, images).flatMap(() => setImageSelected(image).flatMap(() => showImage(image.src)));
}
function createImageTagsFromUrl(url) {
    const atelierImage = effect_1.Effect.unit(() => document.createElement("img"));
    return atelierImage.map((image) => {
        image.src = url;
        return image;
    });
}
function convertImagesToListItems(images) {
    return effect_1.Effect.forEach(images, (image) => {
        return effect_1.Effect.unit(() => document.createElement("li")).map((liElement) => {
            liElement.classList.add(imageListElement);
            liElement.appendChild(image);
            return liElement;
        });
    });
}
function addEventListenerToImages(images, cb) {
    return effect_1.Effect.forEach_(images, (i) => effect_1.Effect.unit(() => {
        i.addEventListener("click", () => {
            cb(i, images).run();
        });
    }));
}
function setImageSelected(image) {
    return effect_1.Effect.unit(() => {
        image.classList.add(imageSelected, imageDetail);
    });
}
function removeSelectedFromImages(image, images) {
    return effect_1.Effect.forEach_(images.filter((i) => i !== image), (i) => effect_1.Effect.unit(() => {
        i.classList.remove(imageSelected);
    }));
}
function showImage(url) {
    return effect_1.Effect.unit(() => document.querySelector(`.${imageDetail}`)).flatMap((imageContainer) => effect_1.Effect.unit(() => document.createElement("img")).map((image) => {
        image.classList.add(imageSelected, imageDetail);
        image.src = url;
        imageContainer.innerHTML = "";
        imageContainer.appendChild(image);
    }));
}
function generateCategoryParam() {
    const categoryParam = new URLSearchParams(location.search).get("category");
    return categoryParam ? `?category=${categoryParam}` : "";
}
addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    return init().then((effect) => {
        effect.run();
    });
}));

},{"./functional/effect":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(run) {
        this.run = run;
    }
    static unit(f) {
        return new Effect(f);
    }
    static forEach(la, f) {
        return new Effect(() => la.map((a) => f(a).run()));
    }
    static forEach_(la, f) {
        return new Effect(() => la.forEach((a) => f(a).run()));
    }
    static when(cond, effect) {
        return new Effect(() => {
            if (cond)
                return effect.run();
            return;
        });
    }
    flatMap(f) {
        const a = this.run();
        return new Effect(() => f(a).run());
    }
    map(f) {
        return new Effect(() => f(this.run()));
    }
}
exports.Effect = Effect;

},{}]},{},[1,2]);

},{"./functional/effect":15}],6:[function(require,module,exports){
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
const api_1 = require("./api/api");
const createLoader_1 = require("./utils/createLoader");
const product_1 = require("./interfaces/product");
function init(category = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainer = document.querySelector(".ateliershop-images");
        imageContainer.innerHTML = "";
        let currentPage = 0;
        const nextButton = document.querySelector(".shop-next-btn");
        // A button is cloned to reset all eventlisteners on it.
        const newButton = document.createElement("button");
        newButton.textContent = nextButton.innerText;
        newButton.classList.add("shop-next-btn");
        // Replace the old button with the clone.
        nextButton.replaceWith(newButton);
        // Spinning loader.
        const loader = createLoader_1.createLoader();
        // Loader is shown instead of the button.
        newButton.replaceWith(loader);
        const body = yield fetchProducts(0, category);
        // Calculate the total pages of products.
        const amountOfPages = body.products.length === 0
            ? 0
            : Math.ceil(body.count / body.paginationSize);
        // Store the processed images.
        const processedImages = [];
        // Create new images from the products can cache the result.
        processedImages.push(...(yield setUpPage(body.products, [])));
        // Remove the "more" button if there are no more products to fetch.
        newButton.style.display = currentPage + 1 >= amountOfPages ? "none" : "block";
        // After loading, replace the spinner with the "more" button.
        loader.replaceWith(newButton);
        // Fetch all categories.
        const categories = new Set([
            ["Alles", ""],
            ...body.products
                .map((p) => [p.categoryName, p.categorySlug, p.categoryDescription])
                .filter(([name, _]) => Boolean(name))
            // JSON.stringify is used to ensure all entries are unique for the Set.
            // In JS ["x"] != ["x"].
        ].map((x) => JSON.stringify(x)));
        // Use the categories to populate the categories select filter box.
        setFilterMenu(categories);
        // Setup the "More" button.
        newButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const loader = createLoader_1.createLoader();
            newButton.replaceWith(loader);
            const newResult = yield fetchProducts(++currentPage, category);
            processedImages.push(...(yield setUpPage(newResult.products, processedImages)));
            loader.replaceWith(newButton);
            newButton.style.display =
                currentPage + 1 >= amountOfPages ? "none" : "block";
        }));
    });
}
function setUpPage(products, processed) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageContainer = document.querySelector(".ateliershop-images");
        const images = yield Promise.all(products.map(createProductUIComponent));
        const updatedImages = [...processed, ...images];
        // Check if any images are in portrait mode, then add borders.
        if (updatedImages.some((i) => {
            const image = i.querySelector("img");
            return !isLandscape(image);
        }))
            updatedImages.forEach(addBorderToProduct);
        images.forEach((c) => imageContainer.appendChild(c));
        return updatedImages;
    });
}
function fetchProducts(page, category = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield api_1.Api.GET(`products/?page=${page}&category=${category}`);
        const json = yield response.json();
        return {
            products: json.products.map(product_1.FromJSON),
            count: json.count,
            paginationSize: json.paginationSize
        };
    });
}
function setFilterMenu(categories) {
    const filterMenu = document.querySelector("select");
    if (filterMenu.querySelector("option"))
        return;
    if (filterMenu.parentElement)
        filterMenu.parentElement.style.visibility = "visible";
    filterMenu.addEventListener("change", () => {
        init(filterMenu.value);
    });
    Array.from(categories)
        .map((json) => JSON.parse(json))
        .map(([name, slug, description]) => {
        const option = document.createElement("option");
        option.classList.add("filter-menu");
        option.value = slug;
        option.textContent = description ? `${name} - ${description}` : `${name}`;
        return option;
    })
        .forEach((o) => filterMenu.appendChild(o));
}
function createProductUIComponent(product) {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    const image = new Image();
    image.classList.add("product-image");
    const name = document.createElement("a");
    name.classList.add("product-name");
    const description = document.createElement("p");
    description.classList.add("product-description");
    name.href = `/product-details/?product=${product.id}`;
    name.append(document.createTextNode(product.name));
    description.innerHTML = product.description;
    const productTextContainer = document.createElement("div");
    productTextContainer.classList.add("product-text");
    productTextContainer.append(name, description);
    imageFrame.append(image, productTextContainer);
    image.src = product.imageUrl;
    return new Promise((resolve) => {
        image.onload = () => resolve(imageFrame);
    });
}
function addBorderToProduct(imageFrame) {
    const image = imageFrame.querySelector("img");
    const name = imageFrame.querySelector(".product-text");
    if (isLandscape(image)) {
        imageFrame.style.borderTop = "1px solid white";
        name.style.borderTop = "1px solid white";
        image.style.maxHeight = "250px";
    }
    else {
        image.style.maxHeight = "400px";
    }
}
function isLandscape(image) {
    return image.height < image.width;
}
init();

},{"./api/api":1,"./interfaces/product":21,"./utils/createLoader":28}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
articles_1.setUpArticles("/wp-json/api/blogs");

},{"./articles":3}],8:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
const previouspage_1 = require("./classes/previouspage");
const nextpage_1 = require("./classes/nextpage");
/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
function setUpArticles(url) {
    // fetch articles and use a callback func in the resulting promise.
    fetchArticles(url, 0, (articles, count) => {
        // From the articles create a list view in the DOM.
        createListFromArticles(articles);
        const totalPages = Math.ceil(count / articles.length);
        if (count > articles.length) {
            // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(0, totalPages), new nextpage_1.NextPage(0, totalPages), 
            // refetch articles for the next or previous page, after a click.
            (pageNumber) => fetchArticles(url, pageNumber, createListFromArticles));
        }
    });
}
exports.setUpArticles = setUpArticles;
function createListFromArticles(articles) {
    const anchor = getDomAnchor();
    // Get the article list if exists else create one and
    // attach the list to the Dom via the anchor element.
    // IIF pattern is used to avoid using a mutable variable.
    const articleList = (document.querySelector('.articles') || createArticleList());
    //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.
    if (anchor && articleList.parentNode === null)
        attachElementToAnchor(articleList, anchor);
    // Make sure the list is empty at the start.
    articleList.innerHTML = '';
    // Fill the list with the actual articles.
    articles.forEach((article) => {
        const { date, excerpt, featured_image_url: imageUrl, title, url } = article;
        const articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function attachElementToAnchor(element, anchor) {
    if (anchor) {
        anchor.appendChild(element);
    }
}
function fetchArticles(url, pageNumber, callBackFn) {
    fetch(`${url}/${pageNumber}`).then((response) => response.json()).then((data) => {
        callBackFn(data.blogs, data.count);
    });
}
function getDomAnchor() {
    return document.querySelector('.entry-content');
}
function createArticleList() {
    const el = document.createElement('ul');
    el.classList.add('articles');
    return el;
}
/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(prevPage, nextPage) {
    const hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
    const hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
    const el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        `<button
    ${!hasPrevPage ? 'disabled' : ''}
    class="paginator-prev-btn ${!hasPrevPage ? 'paginator-btn-disabled' : ''}"
    >
      Prev
  </button>
   <button
    ${!hasNextPage ? 'disabled' : ''}
    class="paginator-next-btn ${!hasNextPage ? 'paginator-btn-disabled' : ''}"
  >
      Next
  </button>`;
    return el;
}
function getPaginatorButtonsContainer() {
    return document.querySelector('.paginator-btns');
}
function getPaginatorButtons(container) {
    return [
        container.querySelector('.paginator-prev-btn'),
        container.querySelector('.paginator-next-btn')
    ];
}
function createArticleListItem(articleUrl, articleTitle, articleDate, articleExcerpt, imageSource) {
    const el = document.createElement('li');
    el.classList.add('article');
    const image = imageSource
        ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
        : '';
    el.innerHTML =
        `${image}
      <div class="article-text">
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
    return el;
}
function setUpPaginatorButtons(prevPage, nextPage, fetchArticlesFn) {
    // Create a new set of prev/next buttons for the paginator.
    const buttonsContainer = createPaginatorButtonsWithContainer(prevPage, nextPage);
    // Get the previous attached buttons if they exist.
    const previousButtonsContainer = getPaginatorButtonsContainer();
    // If it already exists swap the old buttons with the new buttons to reset their state.
    // and previous attached eventlisteners.
    if (previousButtonsContainer) {
        const p = previousButtonsContainer.parentNode;
        if (p)
            p.replaceChild(buttonsContainer, previousButtonsContainer);
    }
    // Else attach the new buttons to the DOM.
    else
        attachElementToAnchor(buttonsContainer, getDomAnchor());
    // Get the individual buttons from its container.
    const buttons = getPaginatorButtons(buttonsContainer);
    const [prevButton, nextButton] = buttons;
    // Attach the event listeners.
    prevButton.addEventListener('click', getButtonEventCb(prevPage, fetchArticlesFn));
    nextButton.addEventListener('click', getButtonEventCb(nextPage, fetchArticlesFn));
}
/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(page, fetchArticlesFn) {
    return () => {
        if (page.nextPredicate(page.pageNumber)) {
            // If there is a next page available in the pagination.
            const nextPageNumber = page.nextPage(page.pageNumber);
            // Fetch the next batch of articles by the new pageNumber.
            fetchArticlesFn(nextPageNumber);
            // Update the eventlisteners with new the page information, so
            // with the next click, the correct batch of articles will be fetched.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(nextPageNumber, page.totalPages), new nextpage_1.NextPage(nextPageNumber, page.totalPages), fetchArticlesFn);
        }
    };
}

},{"./classes/nextpage":3,"./classes/previouspage":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
articles_1.setUpArticles("/wp-json/api/blogs");

},{"./articles":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
class NextPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber + 1;
        this.nextPredicate = (pageNumber) => pageNumber < totalPages - 1;
    }
}
exports.NextPage = NextPage;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
class PreviousPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber - 1;
        this.nextPredicate = (pageNumber) => pageNumber > 0;
    }
}
exports.PreviousPage = PreviousPage;

},{}]},{},[2,1]);

},{"./articles":3,"./classes/nextpage":11,"./classes/previouspage":12}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaNumValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class AlphaNumValidator extends fieldvalidator_1.FieldValidator {
    constructor() {
        super(...arguments);
        this.errorMsg = 'Enkel alfa-numerieke tekens en "!?.,()" zijn toegestaan.\n';
    }
    validate(field) {
        return /^[a-zA-Z0-9!?,.()'\n\r ]*$/.test(field.value);
    }
}
exports.AlphaNumValidator = AlphaNumValidator;

},{"../interfaces/fieldvalidator":19}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class CompositeValidator extends fieldvalidator_1.FieldValidator {
    constructor(...validators) {
        super();
        this.errorMsg = '';
        this.validators = validators;
    }
    validate(field) {
        return this.validators.every(v => v.validate(field));
    }
    getError(field) {
        return this.validators.reduce((error, validator) => (`${error}${validator.getError(field)}`), '');
    }
}
exports.CompositeValidator = CompositeValidator;

},{"../interfaces/fieldvalidator":19}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
class NextPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber + 1;
        this.nextPredicate = (pageNumber) => pageNumber < totalPages - 1;
    }
}
exports.NextPage = NextPage;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
class PreviousPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber - 1;
        this.nextPredicate = (pageNumber) => pageNumber > 0;
    }
}
exports.PreviousPage = PreviousPage;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLengthValidator = void 0;
const fieldvalidator_1 = require("../interfaces/fieldvalidator");
class TextLengthValidator extends fieldvalidator_1.FieldValidator {
    constructor(maxLength) {
        super();
        this.maxLength = maxLength;
        this.errorMsg =
            `Ingevoerde tekst moet tussen de 0 en ${this.maxLength} tekens bevatten.\n`;
    }
    validate(field) {
        return 0 < field.value.length && field.value.length <= this.maxLength;
    }
}
exports.TextLengthValidator = TextLengthValidator;

},{"../interfaces/fieldvalidator":19}],14:[function(require,module,exports){
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
exports.Api = void 0;
exports.Api = {
    baseUrl: "/wp-json/api/",
    GET(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${this.baseUrl}${url}`);
        });
    }
};

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(run) {
        this.run = run;
    }
    static unit(f) {
        return new Effect(f);
    }
    static forEach(la, f) {
        return new Effect(() => la.map((a) => f(a).run()));
    }
    static forEach_(la, f) {
        return new Effect(() => la.forEach((a) => f(a).run()));
    }
    static when(cond, effect) {
        return new Effect(() => {
            if (cond)
                return effect.run();
            return;
        });
    }
    flatMap(f) {
        const a = this.run();
        return new Effect(() => f(a).run());
    }
    map(f) {
        return new Effect(() => f(this.run()));
    }
}
exports.Effect = Effect;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textlengthvalidator_1 = require("./classes/textlengthvalidator");
const alphanumvalidator_1 = require("./classes/alphanumvalidator");
const compositevalidator_1 = require("./classes/compositevalidator");
const overlay_1 = require("./utils/overlay");
const ADDCOMMENT_SELECTOR = ".add-comment";
const CANCELCOMMENT_SELECTOR = ".cancel-comment";
const SUBMITCOMMENT_SELECTOR = ".submit-comment";
const GUESTBOOKFORM_SELECTOR = ".guestbook-form";
const ERROR = "error";
const ERROR_COLOR = "red";
const NEUTRAL_COLOR = "black";
const GUESTBOOK_POST_URL = "/wp-json/api/guestbook/";
const TEXTMAXLENGTH = 200;
function init() {
    const form = getCommentForm();
    const nameField = document.querySelector(".input-name");
    const commentField = document.querySelector(".comment-text");
    const formFields = [nameField, commentField];
    const addCommentBtn = document.querySelector(ADDCOMMENT_SELECTOR);
    addCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showCommentModal(form, formFields);
    });
    const cancelCommentBtn = document.querySelector(CANCELCOMMENT_SELECTOR);
    cancelCommentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeCommentModal(form, formFields);
    });
    const submitCommentBtn = document.querySelector(SUBMITCOMMENT_SELECTOR);
    submitCommentBtn.addEventListener("click", (e) => {
        removeErrors();
        e.preventDefault();
        validateFormFields(form, formFields);
    });
}
function getCommentForm() {
    return document.querySelector(GUESTBOOKFORM_SELECTOR);
}
function showCommentModal(form, fields) {
    overlay_1.addOverlay();
    showForm(form);
    resetForm(fields);
}
function removeCommentModal(form, fields) {
    hideForm(form);
    overlay_1.removeOverlay();
    resetForm(fields);
}
function showForm(form) {
    form.style.display = "flex";
}
function hideForm(form) {
    form.style.display = "none";
}
function validateFormFields(form, fields) {
    const guestBookValidator = createGuestBookValidator();
    const invalidFields = fields.filter((field) => !guestBookValidator.validate(field));
    if (invalidFields.length === 0)
        return submitComment(form, fields);
    generateErrors(guestBookValidator, invalidFields);
}
function generateErrors(validator, fields) {
    fields.forEach((field) => {
        displayError(field, validator.getError(field));
    });
}
function createGuestBookValidator() {
    return new compositevalidator_1.CompositeValidator(new textlengthvalidator_1.TextLengthValidator(TEXTMAXLENGTH), new alphanumvalidator_1.AlphaNumValidator());
}
function submitComment(form, fields) {
    const body = fields.reduce((acc, field) => (Object.assign({ [field.name]: field.value }, acc)), {});
    fetch(GUESTBOOK_POST_URL, {
        method: "POST",
        body: JSON.stringify(body)
    }).then(() => {
        removeCommentModal(form, fields);
        location.reload();
    });
}
function displayError(field, errorMsg) {
    field.style.borderColor = ERROR_COLOR;
    const errorField = createErrorText(errorMsg);
    field.after(errorField);
}
function createErrorText(errorMsg) {
    const pElement = document.createElement("p");
    pElement.classList.add(ERROR);
    pElement.innerText = errorMsg;
    return pElement;
}
function resetForm(fields) {
    fields.forEach((field) => {
        field.value = "";
        field.style.borderColor = NEUTRAL_COLOR;
    });
    removeErrors();
}
function removeErrors() {
    const errorFields = document.getElementsByClassName(ERROR);
    Array.prototype.slice.call(errorFields).forEach((field) => field.remove());
}
init();

},{"./classes/alphanumvalidator":9,"./classes/compositevalidator":10,"./classes/textlengthvalidator":13,"./utils/overlay":30}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidator = void 0;
class FieldValidator {
    getError(field) {
        return !this.validate(field) ? this.errorMsg : '';
    }
}
exports.FieldValidator = FieldValidator;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FromJSON = void 0;
function FromJSON(json) {
    return {
        id: json.id,
        name: json.name,
        description: json.description,
        price: json.price,
        imageUrl: json.image_url,
        categoryName: json.category_name,
        categorySlug: json.category_slug,
        categoryDescription: json.category_description,
        detailText: json.detail_text
    };
}
exports.FromJSON = FromJSON;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slideshow_1 = require("./slideshow");
slideshow_1.setUpSlideShow();

},{"./slideshow":26}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
articles_1.setUpArticles('/wp-json/api/poetry');

},{"./articles":3}],24:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpArticles = void 0;
const previouspage_1 = require("./classes/previouspage");
const nextpage_1 = require("./classes/nextpage");
/*
Setup function, to generate a list page for articles with pagination,
the `url` param is used to fetch the articles from the backend.
*/
function setUpArticles(url) {
    // fetch articles and use a callback func in the resulting promise.
    fetchArticles(url, 0, (articles, count) => {
        // From the articles create a list view in the DOM.
        createListFromArticles(articles);
        const totalPages = Math.ceil(count / articles.length);
        if (count > articles.length) {
            // Add the event listeners for the buttons, clicking them will refectch articles from the next batch.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(0, totalPages), new nextpage_1.NextPage(0, totalPages), 
            // refetch articles for the next or previous page, after a click.
            (pageNumber) => fetchArticles(url, pageNumber, createListFromArticles));
        }
    });
}
exports.setUpArticles = setUpArticles;
function createListFromArticles(articles) {
    const anchor = getDomAnchor();
    // Get the article list if exists else create one and
    // attach the list to the Dom via the anchor element.
    // IIF pattern is used to avoid using a mutable variable.
    const articleList = (document.querySelector('.articles') || createArticleList());
    //  if the aricleList was created, it has no parent, in that case it needs to be atached to the DOM.
    if (anchor && articleList.parentNode === null)
        attachElementToAnchor(articleList, anchor);
    // Make sure the list is empty at the start.
    articleList.innerHTML = '';
    // Fill the list with the actual articles.
    articles.forEach((article) => {
        const { date, excerpt, featured_image_url: imageUrl, title, url } = article;
        const articleListElement = createArticleListItem(url, title, date, excerpt, imageUrl);
        if (articleList)
            articleList.appendChild(articleListElement);
    });
}
function attachElementToAnchor(element, anchor) {
    if (anchor) {
        anchor.appendChild(element);
    }
}
function fetchArticles(url, pageNumber, callBackFn) {
    fetch(`${url}/${pageNumber}`).then((response) => response.json()).then((data) => {
        callBackFn(data.blogs, data.count);
    });
}
function getDomAnchor() {
    return document.querySelector('.entry-content');
}
function createArticleList() {
    const el = document.createElement('ul');
    el.classList.add('articles');
    return el;
}
/*
Factory function to create buttons for the paginator, the prevPage and nextPage
inputs are used to determine wheter the buttons is disabled, e.g. if there are no pages to fetch.
*/
function createPaginatorButtonsWithContainer(prevPage, nextPage) {
    const hasPrevPage = prevPage.nextPredicate(prevPage.pageNumber);
    const hasNextPage = nextPage.nextPredicate(nextPage.pageNumber);
    const el = document.createElement('div');
    el.classList.add('paginator-btns');
    el.innerHTML =
        `<button
    ${!hasPrevPage ? 'disabled' : ''}
    class="paginator-prev-btn ${!hasPrevPage ? 'paginator-btn-disabled' : ''}"
    >
      Prev
  </button>
   <button
    ${!hasNextPage ? 'disabled' : ''}
    class="paginator-next-btn ${!hasNextPage ? 'paginator-btn-disabled' : ''}"
  >
      Next
  </button>`;
    return el;
}
function getPaginatorButtonsContainer() {
    return document.querySelector('.paginator-btns');
}
function getPaginatorButtons(container) {
    return [
        container.querySelector('.paginator-prev-btn'),
        container.querySelector('.paginator-next-btn')
    ];
}
function createArticleListItem(articleUrl, articleTitle, articleDate, articleExcerpt, imageSource) {
    const el = document.createElement('li');
    el.classList.add('article');
    const image = imageSource
        ? `<img class="article-image" width="180" heigth="135" src="${imageSource}">`
        : '';
    el.innerHTML =
        `${image}
      <div class="article-text">
        <a class="article-title" href="${articleUrl}">${articleTitle}</a>
        <p class="article-date">${articleDate}</p>
        <p class="article-excerpt">${articleExcerpt}</p>`;
    return el;
}
function setUpPaginatorButtons(prevPage, nextPage, fetchArticlesFn) {
    // Create a new set of prev/next buttons for the paginator.
    const buttonsContainer = createPaginatorButtonsWithContainer(prevPage, nextPage);
    // Get the previous attached buttons if they exist.
    const previousButtonsContainer = getPaginatorButtonsContainer();
    // If it already exists swap the old buttons with the new buttons to reset their state.
    // and previous attached eventlisteners.
    if (previousButtonsContainer) {
        const p = previousButtonsContainer.parentNode;
        if (p)
            p.replaceChild(buttonsContainer, previousButtonsContainer);
    }
    // Else attach the new buttons to the DOM.
    else
        attachElementToAnchor(buttonsContainer, getDomAnchor());
    // Get the individual buttons from its container.
    const buttons = getPaginatorButtons(buttonsContainer);
    const [prevButton, nextButton] = buttons;
    // Attach the event listeners.
    prevButton.addEventListener('click', getButtonEventCb(prevPage, fetchArticlesFn));
    nextButton.addEventListener('click', getButtonEventCb(nextPage, fetchArticlesFn));
}
/*
This function will generate the callback function for the paginator buttons
*/
function getButtonEventCb(page, fetchArticlesFn) {
    return () => {
        if (page.nextPredicate(page.pageNumber)) {
            // If there is a next page available in the pagination.
            const nextPageNumber = page.nextPage(page.pageNumber);
            // Fetch the next batch of articles by the new pageNumber.
            fetchArticlesFn(nextPageNumber);
            // Update the eventlisteners with new the page information, so
            // with the next click, the correct batch of articles will be fetched.
            setUpPaginatorButtons(new previouspage_1.PreviousPage(nextPageNumber, page.totalPages), new nextpage_1.NextPage(nextPageNumber, page.totalPages), fetchArticlesFn);
        }
    };
}

},{"./classes/nextpage":2,"./classes/previouspage":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPage = void 0;
class NextPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber + 1;
        this.nextPredicate = (pageNumber) => pageNumber < totalPages - 1;
    }
}
exports.NextPage = NextPage;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousPage = void 0;
class PreviousPage {
    constructor(pageNumber, totalPages) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextPage = (pageNumber) => pageNumber - 1;
        this.nextPredicate = (pageNumber) => pageNumber > 0;
    }
}
exports.PreviousPage = PreviousPage;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
articles_1.setUpArticles('/wp-json/api/poetry');

},{"./articles":1}]},{},[4,1]);

},{"./articles":3,"./classes/nextpage":11,"./classes/previouspage":12}],25:[function(require,module,exports){
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
const api_1 = require("./api/api");
const product_1 = require("./interfaces/product");
const PRODUCT_DETAIL_CLASS = "product-detail";
const DETAIL_ROW_CLASS = "detail-row";
const BUY_BTN_CLASS = "buy-btn";
const BUY_STRING = "Koop";
const PRODUCT_DETAIL_IMAGE_CLASS = "product-detail-image";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URLSearchParams(document.location.search);
        const productId = url.get("product");
        const [product, _] = yield api_1.Api.GET(`product/${productId}`).then((x) => x.json());
        setUpPage(product_1.FromJSON(product));
    });
}
function setUpPage(product) {
    createProductRow(product);
}
init();
function createProductRow(product) {
    return new Promise((resolve) => {
        var _a, _b;
        const row = document.querySelector(`.${DETAIL_ROW_CLASS}`);
        const image = document.querySelector(`.${PRODUCT_DETAIL_IMAGE_CLASS}`);
        image.src = product.imageUrl;
        image.onload = () => resolve(image);
        const productDetails = document.createElement("div");
        productDetails.classList.add(PRODUCT_DETAIL_CLASS);
        const productName = document.createElement("h1");
        productName.innerHTML = product.name;
        const price = document.createElement("h3");
        price.textContent = `\u20AC ${parseFloat(product.price).toFixed(2)}`;
        productDetails.append(productName, price);
        row.before(productDetails, image);
        const category = document.createElement("p");
        category.innerHTML = (_a = product.categoryName) !== null && _a !== void 0 ? _a : "";
        const description = document.createElement("p");
        description.innerHTML = product.description;
        const details = document.createElement("p");
        details.innerHTML = (_b = product.detailText) !== null && _b !== void 0 ? _b : "";
        const buyButton = document.createElement("button");
        buyButton.classList.add(BUY_BTN_CLASS);
        buyButton.innerHTML = BUY_STRING;
        row.append(category, description, details, buyButton);
    });
}

},{"./api/api":1,"./interfaces/product":21}],26:[function(require,module,exports){
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
    const body = document.querySelector("body");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const buttons = [prevButton, nextButton];
    // Get the current page as a relative path.
    // e.g. https://life-being/life-being-inspirations/art becomes
    // life-begin-inspirations/art
    const page = window.location.pathname
        .split("/")
        // url must be a non-empty string.
        .filter((url) => url !== undefined && url !== "")
        .join("/");
    // If there is nothing after the hostName default to home.
    const files = fetch(`/wp-json/api/gallery-images/?page=${page || "home"}`);
    files
        .then((resp) => resp.json())
        .then(({ imageFiles: rawImages }) => {
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
                index = index === images.length - 1 ? 0 : index + 1;
            }
            // if cycling backwards through the gallery.
            else {
                //  if at the start of the gallery, go the the end, else go to the previous image.
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
// Wrapping the imageNames into a Image obj forces the browser to precache the images.
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
        // Set up the vanshing buttons effect. Start the hiding effect,
        // if the mouse is not over the header.
        // The fading effects work with a timer, we need to keep track of the current One,
        // because only one can be active, it another one becomes active, cancel the previous one.
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
    // Define a isDone func, for a button that is beign shown,
    // the animation is done whem opacity reaches 1.0, else when the button is being
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
    // mark this timer as active. Keep track of it.
    currentActiveTimers.push(timeoutTimer);
}

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = void 0;
function createLoader() {
    const container = document.createElement("div");
    container.classList.add("lds-roller");
    container.innerHTML = `
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  `;
    return container;
}
exports.createLoader = createLoader;

},{}],29:[function(require,module,exports){
"use strict";

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOverlay = exports.addOverlay = void 0;
const OVERLAY_SELECTOR = '.overlay';
function addOverlay() {
    const overlay = document.querySelector(OVERLAY_SELECTOR)
        || document.createElement('div');
    overlay.classList.add('overlay');
    const body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
exports.addOverlay = addOverlay;
function removeOverlay() {
    const overlay = document.querySelector(OVERLAY_SELECTOR);
    // Check if overlay is already active.
    if (overlay) {
        // Remove it
        overlay.remove();
        // Reenable the scroll bar.
        document.body.style.overflowY = 'auto';
    }
}
exports.removeOverlay = removeOverlay;

},{}]},{},[2,3,4,5,6,7,8,14,16,22,23,24,25,26,19,17,18,20,21,9,10,11,12,13,27,28,29,30]);
