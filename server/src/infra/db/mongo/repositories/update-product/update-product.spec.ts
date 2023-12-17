import { UpdateProductRepository } from "../../../../../data/protocols";
import { Product } from "../../../../../domain/models/products";
import { MongoHelper } from "../../helpers/mongo-helper";
import { UpdateProductMongoRepository } from "./update-product";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const NAME = PRODUCT.name;

const makeSut = (): UpdateProductRepository => {
  return new UpdateProductMongoRepository();
}

describe("UpdateProductMongoRepository", () => {
  afterAll(async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should update the product", async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(PRODUCT);

    const sut = makeSut();
    const { image, note, value} = PRODUCT;

    await sut.handle(NAME, { name: "New Product", image, note, value });

    const product = await productCollection.findOne({ name: "New Product" });

    expect(product).toBeTruthy();
    expect(product?.name).toBe("New Product");
    expect(product?.image).toBe(image);
    expect(product?.note).toBe(note);
    expect(product?.value).toBe(value);
  })
})