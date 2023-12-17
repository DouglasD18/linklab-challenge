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
    handle(name: string, product: Product): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new UpdateProductRepositoryStub();
}

interface SutTypes {
  sut: UpdateProductAdapter
  updateProductRepositoryStub: UpdateProductRepository
}

const makeSut = (): SutTypes => {
  const updateProductRepositoryStub = makeUpdateProductRepository();
  const sut = new UpdateProductAdapter(updateProductRepositoryStub);

  return {
    sut,
    updateProductRepositoryStub
  }
}

describe("UpdateProduct Adapter", () => {
  it("Should throws if product not exists", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();

    jest.spyOn(updateProductRepositoryStub, "handle").mockReturnValueOnce(new Promise(resolve => resolve(false)));

    try {
      await sut.handle("Novo Produto", PRODUCT);
    } catch (error) { 
      expect(error).toBeInstanceOf(NotFoundError);
    }

  })

  it("Should call UpdateProductRepository with correct values", async () => {
    const { sut, updateProductRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(updateProductRepositoryStub, "handle");
    await sut.handle(NAME, PRODUCT);

    expect(repositorySpy).toHaveBeenCalledWith(NAME, PRODUCT);
  })

  it("Should throw if UpdateProductRepository throws", async () => {
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