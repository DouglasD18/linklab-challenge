import { DeleteProduct, DeleteProductRepository, NotFoundError } from "./delete-product-protocols";

export class DeleteProductAdapter implements DeleteProduct {
  constructor(private repository: DeleteProductRepository) {}

  async handle(name: string): Promise<void> {
    const isDeleted = await this.repository.handle(name);
    
    if (!isDeleted) {
      throw new NotFoundError();
    }
  }

}