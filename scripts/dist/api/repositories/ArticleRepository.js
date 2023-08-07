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
exports.ArticleRepository = void 0;
const Api_1 = require("../Api");
class ArticleRepository {
    get_articles(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Api_1.Api.GET('articles/', { page: pageNumber.toString() });
            const json = yield resp.json();
            const articles = json.articles;
            return {
                count: json.count,
                hasNext: json["has_next"],
                articles: articles.map(a => ({
                    title: a.title,
                    date: a.date,
                    url: a.url,
                    excerpt: a.excerpt,
                    featuredImageUrl: a.featured_image_url,
                }))
            };
        });
    }
}
exports.ArticleRepository = ArticleRepository;
//# sourceMappingURL=ArticleRepository.js.map