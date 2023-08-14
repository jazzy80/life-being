import {IProductRepository} from "./interfaces/IProductRepository";
import {Product} from "../models/Product";
import {Api} from "../Api";
import {Products} from "../models/Products";

interface ApiProduct {
    id: string,
    name: string,
    description: string,
    price: string,
    image_url: string,
    detail_text: string,
    categories: ApiCategory[],
}

interface ApiCategory {
    name: string,
    slug: string,
    description: string,
}

interface ApiProducts {
    count: string,
    paginationSize: string,
    products: ApiProduct[],
}

export class ProductRepository implements IProductRepository {
    async getProductById(id: number): Promise<Product> {
        const resp = await Api.GET(`product/${id}/`);
        const {product}: { product: ApiProduct } = await resp.json();
        return this.toCommon(product);
    }

    async getProducts(page: number, category?: string): Promise<Products> {
        const resp = await Api.GET(
            'products/',
            {page: page.toString(), category: category ?? ""}
        );
        const products: ApiProducts = await resp.json();
        return {
            count: parseInt(products.count),
            paginationSize: parseInt(products.paginationSize),
            products: products.products.map(this.toCommon),
        };
    }

    private toCommon(product: ApiProduct): Product {
        return {
            id: parseInt(product.id),
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            imageUrl: product.image_url,
            detailText: product.detail_text,
            categories: product.categories
                .map(c => (
                    {
                        categoryName: c.name,
                        categoryDescription:
                        c.description, categorySlug: c.slug
                    }
                ))
        };
    }


}