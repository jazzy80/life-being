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
        setUpPage((0, product_1.FromJSON)(product));
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
        const productOptions = document.createElement("select");
        productOptions.innerHTML = `<option>Maak een keuze</option>
    </option><option value="List">Met Lijst</option>
     <option value="FineArts">Fine Arts</option>`;
        const buyButton = document.createElement("button");
        buyButton.classList.add(BUY_BTN_CLASS);
        buyButton.innerHTML = BUY_STRING;
        row.append(category, description, details, productOptions, buyButton);
    });
}
//# sourceMappingURL=productdetails.js.map