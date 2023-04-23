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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let currentPage = 0;
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");
        setUpPage(currentPage, [prevButton, nextButton]);
        prevButton.addEventListener("click", () => {
            setUpPage(--currentPage, [prevButton, nextButton]);
        });
        nextButton.addEventListener("click", () => {
            setUpPage(++currentPage, [prevButton, nextButton]);
        });
    });
}
function setUpPage(currentPage, buttons, category = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield fetchProducts(category, currentPage);
        const products = body.products;
        const paginationSize = body.paginationSize;
        const amountOfPages = products.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
        const imageContainer = document.querySelector(".bigdreams-images");
        //const categories = await fetchCategories();
        const categories = [
            ["Alles", ""],
            ...products
                .map((p) => [p.category_name, p.category_slug])
                .filter(([name, _]) => Boolean(name))
        ];
        imageContainer.innerHTML = "";
        setPaginationText(currentPage, products.length, body.count, paginationSize);
        setFilterMenu(categories, buttons);
        setButtons(buttons, currentPage, amountOfPages);
        products
            .map(createProductUIComponent)
            .forEach((c) => imageContainer.appendChild(c));
    });
}
function fetchProducts(category, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/wp-json/api/products/?page=${page}&category=${category}`);
        return response.json();
    });
}
function setFilterMenu(categories, buttons) {
    const toolbar = document.querySelector(".bigdreams-toolbar");
    const isFilterMenuCreated = document.querySelector("select");
    if (!isFilterMenuCreated) {
        const filterMenu = document.createElement("select");
        filterMenu.addEventListener("change", () => {
            setUpPage(0, buttons, filterMenu.value);
        });
        categories
            .map(([name, slug]) => {
            const option = document.createElement("option");
            option.classList.add("filter-menu");
            option.value = slug;
            option.textContent = name;
            return option;
        })
            .forEach((o) => filterMenu.appendChild(o));
        toolbar.appendChild(filterMenu);
    }
}
function setPaginationText(currentPage, items, count, paginationSize) {
    const paginationText = document.querySelector(".pagination-text");
    const min = currentPage * paginationSize + 1;
    const max = min + items - 1;
    paginationText.textContent = `Producten ${min} t/m ${max} getoond van de ${count}`;
}
function setButtons(buttons, currentPage, amountOfPages) {
    const [prev, next] = buttons;
    enableButton(prev);
    enableButton(next);
    if (currentPage === 0)
        disableButton(prev);
    if (currentPage === amountOfPages - 1)
        disableButton(next);
    buttons.forEach((b) => (b.style.visibility = "visible"));
}
function disableButton(button) {
    button.classList.add("paginator-btn-disabled");
    button.disabled = true;
}
function enableButton(button) {
    button.classList.remove("paginator-btn-disabled");
    button.disabled = false;
}
function createProductUIComponent(product) {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    const image = new Image();
    image.classList.add("product-image");
    const name = document.createElement("span");
    name.classList.add("product-name");
    const description = document.createElement("span");
    description.classList.add("product-description");
    const price = document.createElement("span");
    name.classList.add("product-price");
    name.append(document.createTextNode(product.name));
    description.append(document.createTextNode(product.description));
    price.append(document.createTextNode(`\u20AC${parseFloat(product.price).toFixed(2)}`));
    imageFrame.append(image, name, description, price);
    image.src = product.image_url;
    return imageFrame;
}
init();

},{}]},{},[1]);
