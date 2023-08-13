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
        detailText: json.detail_text,
        categories: json.categories.map(c => ({
            categoryName: c.name,
            categoryDescription: c.description,
            categorySlug: c.slug
        }))
    };
}
exports.FromJSON = FromJSON;
//# sourceMappingURL=product.js.map