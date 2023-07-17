export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_name: string | undefined;
  category_slug: string | undefined;
  category_description: string | undefined;
  detail_text: string | undefined;
}
