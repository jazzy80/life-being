import {Category} from "./Category";
import {ProductOption} from "./ProductOption";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  detailText: string | undefined;
  categories: Category[],
  productOptions: ProductOption[],
}
