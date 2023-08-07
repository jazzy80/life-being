import {Article} from "./Article";

export interface Articles {
    articles: Article[],
    count: number,
    hasNext: boolean
}