import {Product} from "./Product";

export interface Products {
    count: number,
    paginationSize: number,
    products: Product[],
}