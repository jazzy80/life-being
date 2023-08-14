import {Product} from "../../models/Product";
import {Products} from "../../models/Products";

export interface IProductRepository {
    getProducts(page: number, category?: string): Promise<Products>;

    getProductById(id: number): Promise<Product>;
}