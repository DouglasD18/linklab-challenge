import { DeleteProductRepository } from "../../../../../data/protocols";
import { Product } from "../../../../../domain/models/products";
import { MongoHelper } from "../../helpers/mongo-helper";
import { DeleteProductMongoRepository } from "./delete-product";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const NAME = PRODUCT.name;

const makeSut = (): DeleteProductRepository => {
  return new DeleteProductMongoRepository();
}

describe("DeleteProductMongoRepository", () => {
  beforeAll(async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(PRODUCT);
  })

  afterAll(async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return true if delete the product", async () => {
    const sut = makeSut();

    const response = await sut.handle(NAME);

    expect(response).toBe(true);
  })

  it("Should return faalse if do not delete the product", async () => {
    const sut = makeSut();

    const response = await sut.handle("New Product");

    expect(response).toBe(false);
  })

  it("Should delete the product", async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(PRODUCT);

    const sut = makeSut();

    await sut.handle(NAME);

    const product = await productCollection.findOne({ name: NAME });

    expect(product).toBeFalsy();
  })
})