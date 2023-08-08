import {Article} from "../models/Article";

export interface IArticleRepository {
    getArticles(pageNumber: number): Promise<{count: number, hasNext: Boolean, articles: Article[]}>;
}