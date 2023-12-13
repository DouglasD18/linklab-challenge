import { Product } from "../../domain/models/products";

export interface CreateProductRepository {
  handle(product: Product): Promise<Product>;
}
