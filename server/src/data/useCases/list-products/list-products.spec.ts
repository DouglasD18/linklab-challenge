import { ListProductsAdapter } from "./list-products";
import { Product, ListProductsRepository } from "./list-products-protocols";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const makeListProductsRepositoryStub = (): ListProductsRepository => {
  class ListProductsRepositoryStub implements ListProductsRepository {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve([PRODUCT]));
    }
  }

  return new ListProductsRepositoryStub();
}

interface SutTypes {
  sut: ListProductsAdapter
  listProductsRepositoryStub: ListProductsRepository
}

const makeSut = (): SutTypes => {
  const listProductsRepositoryStub = makeListProductsRepositoryStub();
  const sut = new ListProductsAdapter(listProductsRepositoryStub);

  return {
    sut,
    listProductsRepositoryStub
  }
}

describe("ListProducts Adapter", () => {
  it("Should throw if ListProductsRepository throws", async () => {
    const { sut, listProductsRepositoryStub} = makeSut();

    jest.spyOn(listProductsRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle();

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    expect(response).toEqual([PRODUCT]);
  })
})