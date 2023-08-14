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
const ProductRepository_1 = require("./api/repositories/ProductRepository");
const PRODUCT_DETAIL_CLASS = "product-detail";
const DETAIL_ROW_CLASS = "detail-row";
const BUY_BTN_CLASS = "buy-btn";
const BUY_STRING = "Koop";
const PRODUCT_DETAIL_IMAGE_CLASS = "product-detail-image";
function init(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URLSearchParams(document.location.search);
        const productId = url.get("product");
        if (!productId) {
            throw new Error("No product id was provided.");
        }
        const product = yield repository.getProductById(parseInt(productId));
        createProductDetail(product);
        return Promise.resolve();
    });
}
function createProductDetail(product) {
    const row = document.querySelector(`.${DETAIL_ROW_CLASS}`);
    const image = document.querySelector(`.${PRODUCT_DETAIL_IMAGE_CLASS}`);
    image.src = product.imageUrl;
    const productDetails = createProductDetailsElement();
    const productName = createProductNameElement(product);
    const price = createPriceElement(product);
    productDetails.append(productName, price);
    row.before(productDetails, image);
    const category = createCategoryElement(product);
    const description = createDescriptionElement(product);
    const details = createDetailsTextElement(product);
    const productOptions = createProductOptions();
    const buyButton = createBuyButton();
    row.append(category, description, details, productOptions, buyButton);
}
function createProductDetailsElement() {
    const productDetails = document.createElement("div");
    productDetails.classList.add(PRODUCT_DETAIL_CLASS);
    return productDetails;
}
function createProductNameElement(product) {
    const productName = document.createElement("h1");
    productName.innerHTML = product.name;
    return productName;
}
function createPriceElement(product) {
    const price = document.createElement("h3");
    price.textContent = `\u20AC ${product.price.toFixed(2)}`;
    return price;
}
function createCategoryElement(product) {
    var _a;
    const category = document.createElement("p");
    category.innerHTML = (_a = product.categories[0].categoryName) !== null && _a !== void 0 ? _a : "";
    return category;
}
function createDescriptionElement(product) {
    const description = document.createElement("p");
    description.innerHTML = product.description;
    return description;
}
function createDetailsTextElement(product) {
    var _a;
    const details = document.createElement("span");
    details.classList.add('details-text');
    details.innerHTML = `<pre> ${(_a = product.detailText) !== null && _a !== void 0 ? _a : ""} </pre>`;
    return details;
}
function createProductOptions() {
    const productOptions = document.createElement("form");
    productOptions.innerHTML = `<label>Kies jouw opties:</label><input type="checkbox">Met Lijst</input>
     <input type="checkbox">Fine Arts</input>`;
    return productOptions;
}
function createBuyButton() {
    const buyButton = document.createElement("button");
    buyButton.classList.add(BUY_BTN_CLASS);
    buyButton.innerHTML = BUY_STRING;
    return buyButton;
}
init(new ProductRepository_1.ProductRepository()).then(r => r);
//# sourceMappingURL=productdetails.js.map