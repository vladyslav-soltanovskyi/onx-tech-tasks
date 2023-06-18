import { IProduct } from "./product";

interface IOrderedProduct {
  id: number;
  qty: number;
  order_id: number;
  product_id: number;
  created_at: string;
  product: IProduct;
}

export type { IOrderedProduct };