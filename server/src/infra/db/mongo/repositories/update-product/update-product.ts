import { UpdateProductRepository } from "../../../../../data/protocols";
import { MongoHelper, Product } from "../create-product/create-product-protocols";

export class UpdateProductMongoRepository implements UpdateProductRepository {
  async handle(name: string, product: Product): Promise<boolean> {
    const { image, value, note } = product;
    const productCollection = await MongoHelper.getCollection("products");
    const result = await productCollection.findOneAndUpdate({ name }, { $set: { name: product.name, image, note, value }}, { upsert: false })

    return result ? true : false;
  }
  
}