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
//# sourceMappingURL=product.js.map