export interface Product {
  id: string;
  title: string;
  permalink: string;
  category_id: string;
  thumbnail: string;
  price: number;
  currency_id: string;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}
