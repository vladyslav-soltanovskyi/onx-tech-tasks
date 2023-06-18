import { IOrderedProduct } from "./ordered-product";

interface IOrder {
  id: number;
  client_id: number;
  created_at: string;
  ordered_products: IOrderedProduct[];
}

export type { IOrder };