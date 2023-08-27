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
const baseUrl = "/wp-json/api/";
exports.Api = {
    GET(url, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
            return yield fetch(`${baseUrl}${url}${urlParams}`);
        });
    },
    POST(url, dataBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${baseUrl}${url}`, { method: "POST", body: dataBody });
        });
    }
};

},{}],2:[function(require,module,exports){
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
exports.ProductRepository = void 0;
const Api_1 = require("../Api");
class ProductRepository {
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Api_1.Api.GET(`products/${id}/`);
            const { product } = yield resp.json();
            return this.toCommon(product);
        });
    }
    getProducts(page, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Api_1.Api.GET('products/', { page: page.toString(), category: category !== null && category !== void 0 ? category : "" });
            const products = yield resp.json();
            return {
                count: parseInt(products.count),
                paginationSize: parseInt(products.paginationSize),
                products: products.products.map(this.toCommon),
            };
        });
    }
    toCommon(product) {
        return {
            id: parseInt(product.id),
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            imageUrl: product.image_url,
            detailText: product.detail_text,
            categories: product.categories
                .map(c => ({
                categoryName: c.name,
                categoryDescription: c.description, categorySlug: c.slug
            })),
            productOptions: product.product_options
                .map(option => ({
                id: option.id,
                name: option.name,
                price: option.price
            })),
        };
    }
}
exports.ProductRepository = ProductRepository;

},{"../Api":1}],3:[function(require,module,exports){
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

},{"./api/repositories/ProductRepository":2}]},{},[3]);
