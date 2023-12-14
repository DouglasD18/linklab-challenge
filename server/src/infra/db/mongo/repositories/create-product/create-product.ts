import { CreateProductRepository, Product, MongoHelper } from "./create-product-protocols";

export class CreateProductMongoRepository implements CreateProductRepository {
  async handle(product: Product): Promise<Product> {
    const beerCollection = await MongoHelper.getCollection('products');
    await beerCollection.insertOne(product);
    return product;
  }
  
}