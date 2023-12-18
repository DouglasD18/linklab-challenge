import { UpdateProduct, UpdateProductRepository, Product, NotFoundError } from "./update-product-protocols";

export class UpdateProductAdapter implements UpdateProduct {
  constructor(
    private repository: UpdateProductRepository
  ) {}

  async handle(name: string, product: Product): Promise<void> {
    const isUpdated = await this.repository.handle(name, product);

    if (!isUpdated) {
      throw new NotFoundError();
    }
  }
}