import { Product as ApiProduct } from "../api/models/product";

export function FromJSON(json: ApiProduct): Product {
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
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryName: string | undefined;
  categorySlug: string | undefined;
  categoryDescription: string | undefined;
  detailText: string | undefined;
}
