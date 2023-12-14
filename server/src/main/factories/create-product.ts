import { CreateProductAdapter } from "../../data/useCases/create-product/create-product";
import { CreateProductMongoRepository } from "../../infra/db/mongo/repositories/create-product/create-product";
import { CreateProductController } from "../../presentation/controllers/create-product/create-product";
import { ProductValidationAdapter } from "../../utils/product-validation/product-validation";

export const makeCreateProductController = (): CreateProductController => {
  const repository = new CreateProductMongoRepository();
  const createProduct = new CreateProductAdapter(repository);
  const productValidation = new ProductValidationAdapter();
  return new CreateProductController(createProduct, productValidation);
}
