import { UpdateProduct, UpdateProductRepository, ListProducts, Product, NotFoundError } from "./update-product-protocols";

export class UpdateProductAdapter implements UpdateProduct {
  constructor(
    private repository: UpdateProductRepository,
    private listProducts: ListProducts
  ) {}

  async handle(name: string, product: Product): Promise<void> {
    const products = await this.listProducts.handle();

    if (!products.find(product => product.name === name)) {
      throw new NotFoundError();
    }

    await this.repository.handle(name, product);
  }
}