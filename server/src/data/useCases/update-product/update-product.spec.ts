import { UpdateProductAdapter } from "./update-product";
import { ListProducts, NotFoundError, Product, UpdateProductRepository } from "./update-product-protocols";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const NAME = PRODUCT.name;

const makeUpdateProductRepository = (): UpdateProductRepository => {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    handle(name: string, product: Product): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new UpdateProductRepositoryStub();
}

const makeListProductsStub = (): ListProducts => {
  class ListProductsStub implements ListProducts {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve([PRODUCT]));
    }
  }

  return new ListProductsStub();
}

interface SutTypes {
  sut: UpdateProductAdapter
  updateProductRepositoryStub: UpdateProductRepository,
  listProducts: ListProducts
}

const makeSut = (): SutTypes => {
  const updateProductRepositoryStub = makeUpdateProductRepository();
  const listProducts = makeListProductsStub();
  const sut = new UpdateProductAdapter(updateProductRepositoryStub, listProducts);

  return {
    sut,
    updateProductRepositoryStub,
    listProducts
  }
}

describe("UpdateProduct Adapter", () => {
  it("Should call ListProducts", async () => {
    const { sut, listProducts } = makeSut();

    const repositorySpy = jest.spyOn(listProducts, "handle");
    await sut.handle(NAME, PRODUCT);

    expect(repositorySpy).toHaveBeenCalled();
  })

  it("Should throws if product not exists", async () => {
    const { sut } = makeSut();

    try {
      await sut.handle("Novo Produto", PRODUCT);
    } catch (error) { 
      expect(error).toBeInstanceOf(NotFoundError);
    }

  })

  it("Should UpdateProductRepository with correct values", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(updateProductRepositoryStub, "handle");
    await sut.handle(NAME, PRODUCT);

    expect(repositorySpy).toHaveBeenCalledWith(NAME, PRODUCT);
  })

  it("Should call throw if UpdateProductRepository throws", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();

    jest.spyOn(updateProductRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle(NAME, PRODUCT);

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(NAME, PRODUCT);

    expect(response).toBeFalsy();
  })
})