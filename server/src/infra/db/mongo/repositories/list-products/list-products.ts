import { ListProductsRepository, Product, MongoHelper } from "./list-products-protocols";

export class ListProductsMongoRepository implements ListProductsRepository {
  async handle(): Promise<Product[]> {
    const productCollection = await MongoHelper.getCollection('products');
    const products = await productCollection.find({},  { projection: { _id: 0, name: 1, image: 1, note: 1, value: 1 } }).toArray();

    return products as unknown as Product[];
  }
  
}