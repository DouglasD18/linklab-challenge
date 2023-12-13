import { Product } from "../models/products";

export interface CreateProduct {
  handle(product: Product): Promise<Product>
}
