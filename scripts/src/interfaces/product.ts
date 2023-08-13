import { Product } from "../api/models/Product";

export function FromJSON(json: ApiProduct): Product {
  return {
    id: json.id,
    name: json.name,
    description: json.description,
    price: json.price,
    imageUrl: json.image_url,
    detailText: json.detail_text,
    categories: json.categories.map(c => ({
      categoryName: c.name,
      categoryDescription: c.description,
      categorySlug: c.slug
    }))
  };
}
export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  detail_text: string | undefined;
  categories: ApiCategory[];
}

interface ApiCategory {
  name: string;
  description: string;
  slug: string;
}
