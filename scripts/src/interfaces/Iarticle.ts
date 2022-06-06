/* Representation of an article */
export interface IArticle {
  date: string,
  excerpt: string,
  featured_image_url: string | null,
  title: string,
  url: string
};
