import { DeleteProductRepository } from "../../../../../data/protocols";
import { MongoHelper } from "../../helpers/mongo-helper";

export class DeleteProductMongoRepository implements DeleteProductRepository {
  async handle(name: string): Promise<boolean> {
    const productCollection = await MongoHelper.getCollection("products");
    const deleted = await productCollection.findOneAndDelete({ name });

    return deleted ? true : false;
  }
  
}