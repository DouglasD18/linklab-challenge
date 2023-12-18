import { Product } from "../../domain/models/products";

export interface UpdateProductRepository {
  handle(name: string, product: Product): Promise<boolean>;
}