import {IArticleRepository} from "./IArticleRepository";
import {Api} from "../Api";
import {Articles} from "../models/Articles";

interface APIArticle {
    date: string,
    excerpt: string,
    featured_image_url: string | null,
    title: string,
    url: string
}

export class ArticleRepository implements IArticleRepository {
    async get_articles(pageNumber: number): Promise<Articles> {
        const resp = await Api.GET('articles/', {page: pageNumber.toString()});
        const json = await resp.json()
        const articles: APIArticle[] = json.articles;
        return {
            count: json.count,
            hasNext: json["has_next"],
            articles: articles.map(
                a => ({
                    title: a.title,
                    date: a.date,
                    url: a.url,
                    excerpt: a.excerpt,
                    featuredImageUrl: a.featured_image_url,
                })
            )
        };
    }

}