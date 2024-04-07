import { Articles } from "../../models/Articles";

export interface IArticleRepository {
  getArticles(pageNumber: number): Promise<Articles>;
}
