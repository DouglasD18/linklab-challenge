import { CreateProductRepository, Product, MongoHelper } from "./create-product-protocols";

export class CreateProductMongoRepository implements CreateProductRepository {
  async handle(product: Product): Promise<Product> {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(product);
    return product;
  }
  
}