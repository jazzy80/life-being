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
//# sourceMappingURL=ProductRepository.js.map