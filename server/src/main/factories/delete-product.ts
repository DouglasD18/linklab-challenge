import { DeleteProductAdapter } from "../../data/useCases/delete-product/delete-product";
import { DeleteProductMongoRepository } from "../../infra/db/mongo/repositories/delete-product/delete-product";
import { DeleteProductController } from "../../presentation/controllers/delete-product/delete-product";

export const makeDeleteProductController = (): DeleteProductController => {
  const repository = new DeleteProductMongoRepository();
  const deleteProduct = new DeleteProductAdapter(repository);
  return new DeleteProductController(deleteProduct);
}
