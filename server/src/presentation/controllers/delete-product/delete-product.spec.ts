import { DeleteProductController } from "./delete-product";
import { DeleteProduct, MissingParamError, InvalidParamError, serverError, HttpRequest, NotFoundError, notFound } from "./delete-product-protocols";

const NAME = {
  name: "Product"
};

interface SutTypes {
  sut: DeleteProductController
  deleteProductStub: DeleteProduct
}

const makeDeleteProductStub = (): DeleteProduct => {
  class DeleteProductStub implements DeleteProduct {
    handle(name: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new DeleteProductStub();
}

const makeSut = (): SutTypes => {
  const deleteProductStub = makeDeleteProductStub();
  const sut = new DeleteProductController(deleteProductStub);

  return {
    sut,
    deleteProductStub
  }
}

describe('DeleteProduct Controller', () => {
  it("Should return 400 if name param is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {}

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  })

  it("Should return 400 if name param is invalid", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        name: 27
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('name', "Name must be a string"));
  })

  it("Should call UpdateProduct with correct values", async () => {
    const { sut, deleteProductStub } = makeSut();
    const httpRequest = {
      params: NAME
    }

    const deleteProductSpy = jest.spyOn(deleteProductStub, "handle");
    await sut.handle(httpRequest);

    expect(deleteProductSpy).toHaveBeenCalledWith(NAME.name);
  });

  it('Should return 500 if deleteProduct throws', async () => {
    const { sut, deleteProductStub } = makeSut();
    const httpRequest = {
      params: NAME
    }
    
    jest.spyOn(deleteProductStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return throw with NotFoundError', async () => {
    const { sut, deleteProductStub } = makeSut();
    const httpRequest = {
      params: NAME
    }
    
    jest.spyOn(deleteProductStub, "handle").mockImplementationOnce(() => {
      throw new NotFoundError();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(notFound());
  });

  it('Should return 203 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: NAME
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBe("No Content");
  });
});