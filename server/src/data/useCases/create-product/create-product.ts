import { CreateProduct, CreateProductRepository, Product } from "./create-product-protocols";

export class CreateProductAdapter implements CreateProduct {
  constructor(private repository: CreateProductRepository) {}

  async handle(product: Product): Promise<Product> {
    const returned = await this.repository.handle(product);
    return returned;
  }
  
}