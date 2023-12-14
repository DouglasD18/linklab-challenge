import { ListProducts, ListProductsRepository, Product } from "./list-products-protocols";

export class ListProductsAdapter implements ListProducts {
  constructor(private repository: ListProductsRepository) {}

  async handle(): Promise<Product[]> {
    const products = await this.repository.handle();
    return products;
  }
}