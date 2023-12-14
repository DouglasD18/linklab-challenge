import { CreateProductMongoRepository } from "./create-product";
import { CreateProductRepository, MongoHelper, Product } from "./create-product-protocols";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const makeSut = (): CreateProductRepository => {
  return new CreateProductMongoRepository();
}

describe("CreateProductMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  })

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('products');
    await accountCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('products')
    await accountCollection.deleteMany({})
  })

  it("Should return an product on success", async () => {
    const sut = makeSut();

    const product = await sut.handle(PRODUCT);

    expect(product).toBeTruthy();
  })

  it("Should return an product with correct properties", async () => {
    const sut = makeSut();

    const product = await sut.handle(PRODUCT);

    expect(product.name).toEqual(PRODUCT.name);
    expect(product.note).toEqual(PRODUCT.note);
    expect(product.image).toEqual(PRODUCT.image);
    expect(product.value).toEqual(PRODUCT.value);
  })
})