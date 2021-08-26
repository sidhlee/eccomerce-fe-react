export interface IProduct {
  id: number;
  name: string;
  created_at: string;
  variants: IVariant[];
}

export interface IVariant {
  id: number;
  name: string;
  /** type of the product */
  product_name: string;
  sku: string;
  price: string;
  currency: string;
  product: number;
  created_at: string;
  likes: number;
  image_url: string;
  thumbnail_url: string;
}
