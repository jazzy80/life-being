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
const selectedOptions = new Set();
function init(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield createProductDetail(repository);
    });
}
function createProductDetail(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = new URLSearchParams(location.search).get("product");
        if (!productId) {
            throw new Error("Product id could not be parsed from the url.");
        }
        const product = yield repository.getProductById(parseInt(productId));
        setProductOptionsEventHandlers(product);
    });
}
function setProductOptionsEventHandlers(product) {
    const productOptions = product.productOptions.reduce((acc, productOption) => (Object.assign(Object.assign({}, acc), { [productOption.id]: productOption })), {});
    const choices = Array.from(document.querySelectorAll("form input"));
    const totalPriceElement = document.querySelector(".price");
    choices.forEach(c => c.addEventListener("change", () => {
        const selectedOption = productOptions[parseInt(c.value)];
        if (c.checked) {
            selectedOptions.add(selectedOption);
        }
        else {
            selectedOptions.delete(selectedOption);
        }
        const optionsTotalPrice = Array
            .from(selectedOptions)
            .reduce((x, y) => x + y.price, 0.0);
        totalPriceElement.textContent = `€${product.price + optionsTotalPrice}`;
    }));
}
init(new ProductRepository_1.ProductRepository()).then(r => r);
//# sourceMappingURL=productdetails.js.map