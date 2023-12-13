import { CreateProductAdapter } from "./create-product";
import { CreateProductRepository, Product } from "./create-product-protocols";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const makeCreateProductRepository = (): CreateProductRepository => {
  class CreateProductRepositoryStub implements CreateProductRepository {
    handle(product: Product): Promise<Product> {
      return new Promise(resolve => resolve(product));
    }
  }

  return new CreateProductRepositoryStub();
}

interface SutTypes {
  sut: CreateProductAdapter
  createProductRepositoryStub: CreateProductRepository
}

const makeSut = (): SutTypes => {
  const createProductRepositoryStub = makeCreateProductRepository();
  const sut = new CreateProductAdapter(createProductRepositoryStub);

  return {
    sut,
    createProductRepositoryStub
  }
}

describe("CreateProduct Adapter", () => {
  it("Should CreateProductRepository with correct values", async () => {
    const { sut, createProductRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(createProductRepositoryStub, "handle");
    await sut.handle(PRODUCT);

    expect(repositorySpy).toHaveBeenCalledWith(PRODUCT);
  })

  it("Should throw if CreateProductRepository throws", async () => {
    const { sut, createProductRepositoryStub } = makeSut();

    jest.spyOn(createProductRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle(PRODUCT);

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(PRODUCT);

    expect(response).toEqual(PRODUCT);
  })
})