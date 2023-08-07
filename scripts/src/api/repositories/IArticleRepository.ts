import {Article} from "../models/Article";

export interface IArticleRepository {
    get_articles(pageNumber: number): Promise<{count: number, hasNext: Boolean, articles: Article[]}>;
}