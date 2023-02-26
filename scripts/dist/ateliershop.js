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
        const category = generateCategoryParam();
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");
        setUpPage(category, currentPage, [prevButton, nextButton]);
        prevButton.addEventListener("click", () => {
            setUpPage(category, --currentPage, [prevButton, nextButton]);
        });
        nextButton.addEventListener("click", () => {
            setUpPage(category, ++currentPage, [prevButton, nextButton]);
        });
    });
}
function setUpPage(category, currentPage, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield fetchImages(category, currentPage);
        const products = body.products;
        const paginationSize = body.paginationSize;
        const amountOfPages = products.length === 0 ? 0 : Math.ceil(body.count / paginationSize);
        const imageContainer = document.querySelector(".bigdreams-images");
        imageContainer.innerHTML = "";
        setPaginationText(currentPage, products.length, body.count, paginationSize);
        setButtons(buttons, currentPage, amountOfPages);
        products
            .map(createImageFromSrc)
            .forEach((image) => imageContainer.appendChild(image));
    });
}
function fetchImages(category, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/wp-json/api/products/?page=${page}`);
        return response.json();
    });
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
function createImageFromSrc(product) {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("image-frame");
    const image = new Image();
    image.classList.add("product-image");
    const name = document.createElement("span");
    name.classList.add("product-name");
    const price = document.createElement("span");
    name.classList.add("product-price");
    name.append(document.createTextNode(product.name));
    price.append(document.createTextNode(`\u20AC${product.price}`));
    imageFrame.append(image, name, price);
    image.src = product.image_url;
    return imageFrame;
}
function generateCategoryParam() {
    const categoryParam = new URLSearchParams(location.search).get("category");
    return categoryParam ? `?category=${categoryParam}` : "";
}
init();
