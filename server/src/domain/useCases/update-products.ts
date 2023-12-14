import { Product } from "../models/products";

export interface UpdateProduct {
  handle(name: string, product: Product): Promise<Product>;
}
