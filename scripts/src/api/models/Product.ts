import {Category} from "./Category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  detailText: string | undefined;
  categories: Category[],
}
