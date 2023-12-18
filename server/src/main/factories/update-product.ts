import { UpdateProductAdapter } from "../../data/useCases/update-product/update-product";
import { UpdateProductMongoRepository } from "../../infra/db/mongo/repositories/update-product/update-product";
import { UpdateProductController } from "../../presentation/controllers/update-product/update-product";
import { ProductValidationAdapter } from "../../utils/product-validation/product-validation";

export const makeUpdateProductController = (): UpdateProductController => {
  const updateProductRepository = new UpdateProductMongoRepository();
  const updateProduct = new UpdateProductAdapter(updateProductRepository);
  const productValidation = new ProductValidationAdapter();
  return new UpdateProductController(updateProduct, productValidation);
}