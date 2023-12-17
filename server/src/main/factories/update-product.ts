import { ListProductsAdapter } from "../../data/useCases/list-products/list-products";
import { UpdateProductAdapter } from "../../data/useCases/update-product/update-product";
import { ListProductsMongoRepository } from "../../infra/db/mongo/repositories/list-products/list-products";
import { UpdateProductMongoRepository } from "../../infra/db/mongo/repositories/update-product/update-product";
import { UpdateProductController } from "../../presentation/controllers/update-product/update-product";
import { ProductValidationAdapter } from "../../utils/product-validation/product-validation";

export const makeUpdateProductController = (): UpdateProductController => {
  const updateProductRepository = new UpdateProductMongoRepository();
  const listProductsRepository = new ListProductsMongoRepository();
  const listProducts = new ListProductsAdapter(listProductsRepository);
  const updateProduct = new UpdateProductAdapter(updateProductRepository, listProducts);
  const productValidation = new ProductValidationAdapter();
  return new UpdateProductController(updateProduct, productValidation);
}