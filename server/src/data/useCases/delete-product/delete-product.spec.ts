import { DeleteProductAdapter } from "./delete-product";
import { DeleteProductRepository, NotFoundError } from "./delete-product-protocols";

const NAME = "Product";

const makeDeleteProductRepository = (): DeleteProductRepository => {
  class DeleteProductRepositoryStub implements DeleteProductRepository {
    handle(name: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new DeleteProductRepositoryStub();
}

interface SutTypes {
  sut: DeleteProductAdapter
  deleteProductRepositoryStub: DeleteProductRepository
}

const makeSut = (): SutTypes => {
  const deleteProductRepositoryStub = makeDeleteProductRepository();
  const sut = new DeleteProductAdapter(deleteProductRepositoryStub);

  return {
    sut,
    deleteProductRepositoryStub
  }
}

describe("DeleteProduct Adapter", () => {
  it("Should call DeleteProductRepository with correct values", async () => {
    const { sut, deleteProductRepositoryStub } = makeSut();

    const repositorySpy = jest.spyOn(deleteProductRepositoryStub, "handle");
    await sut.handle(NAME);

    expect(repositorySpy).toHaveBeenCalledWith(NAME);
  })

  it("Should throws if product not exists", async () => {
    const { sut, deleteProductRepositoryStub } = makeSut();

    jest.spyOn(deleteProductRepositoryStub, "handle").mockReturnValueOnce(new Promise(resolve => resolve(false)));

    try {
      await sut.handle("Novo Produto");
    } catch (error) { 
      expect(error).toBeInstanceOf(NotFoundError);
    }

  })


  it("Should throw if DeleteProductRepository throws", async () => {
    const { sut, deleteProductRepositoryStub } = makeSut();

    jest.spyOn(deleteProductRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.handle(NAME);

    expect(promise).rejects.toThrow();
  })

  it("Should return the correct values on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(NAME);

    expect(response).toBeFalsy();
  })
})