import { Product } from "../../../domain/models/products";
import { ListProductsController } from "./list-products";
import { ListProducts, serverError } from "./list-products-protocols";

const httpRequest = {}

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

interface SutTypes {
  sut: ListProductsController
  listProductsStub: ListProducts
}

const makeListProductsStub = (): ListProducts => {
  class ListProductsStub implements ListProducts {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve([PRODUCT]));
    }
  }

  return new ListProductsStub();
}

const makeSut = (): SutTypes => {
  const listProductsStub = makeListProductsStub();
  const sut = new ListProductsController(listProductsStub);

  return {
    sut,
    listProductsStub,
  }
}

describe('ListProducts Controller', () => {
  it('Should return 500 if ListProducts throws', async () => {
    const { sut, listProductsStub } = makeSut();
    
    jest.spyOn(listProductsStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 200 if valid values is provided.', async () => {
    const { sut } = makeSut();
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([PRODUCT]);
  });
});