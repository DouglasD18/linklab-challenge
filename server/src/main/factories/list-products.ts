import { ListProductsAdapter } from "../../data/useCases/list-products/list-products";
import { ListProductsMongoRepository } from "../../infra/db/mongo/repositories/list-products/list-products";
import { ListProductsController } from "../../presentation/controllers/list-products/list-products";

export const makeListProductsController = (): ListProductsController => {
  const repository = new ListProductsMongoRepository();
  const listProducts = new ListProductsAdapter(repository);
  return new ListProductsController(listProducts);
}
