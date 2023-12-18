import { Product } from "../../domain/models/products";

export interface ListProductsRepository {
  handle(): Promise<Product[]>
}