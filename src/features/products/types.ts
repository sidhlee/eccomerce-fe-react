export interface IProduct {
  sync_product: ISyncProduct;
  sync_variants: ISyncVariant[];
}
export interface ISyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}
export interface ISyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  warehouse_product_variant_id?: null;
  retail_price: string;
  sku: string;
  currency: string;
  product: ISyncVariantProduct;
  files?: ISyncVariantFile[] | null;
  options?: null[] | null;
  is_ignored: boolean;
}
export interface ISyncVariantProduct {
  variant_id: number;
  product_id: number;
  image: string;
  name: string;
}
export interface ISyncVariantFile {
  id: number;
  type: string;
  hash: string;
  url?: string | null;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi?: number | null;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
}
