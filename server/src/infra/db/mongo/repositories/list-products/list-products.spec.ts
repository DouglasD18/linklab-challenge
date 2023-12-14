import { ListProductsMongoRepository } from "./list-products";
import { Product, ListProductsRepository, MongoHelper } from "./list-products-protocols";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const makeSut = (): ListProductsRepository => {
  return new ListProductsMongoRepository();
}

describe("ListProductsMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.insertOne(PRODUCT);
  })

  afterAll(async () => {
    const productCollection = await MongoHelper.getCollection('products');
    await productCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return an array of product on success", async () => {
    const sut = makeSut();

    const products = await sut.handle();

    expect(products).toBeTruthy();
    expect(products[0]).toBeTruthy();
  })

  it("Should return an product with correct properties", async () => {
    const sut = makeSut();

    const products = await sut.handle();

    expect(products[0].name).toEqual(PRODUCT.name);
    expect(products[0].note).toEqual(PRODUCT.note);
    expect(products[0].image).toEqual(PRODUCT.image);
    expect(products[0].value).toEqual(PRODUCT.value);
  })
})