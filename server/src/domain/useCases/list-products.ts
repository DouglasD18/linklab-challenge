import { Product } from "../models/products";

export interface ListProducts {
  handle(): Promise<Product[]>;
}