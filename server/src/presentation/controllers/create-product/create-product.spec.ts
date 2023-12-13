import { Product } from "../../../domain/models/products"
import { Validated } from "../../../domain/models/validated"
import { InvalidParamError, MissingParamError } from "../../errors"
import { CreateProductController } from "./create-product"
import { CreateProduct, ProductValidation, serverError } from "./create-product-protocols"

const VALIDATED: Validated = {
  isValid: true
}

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

interface SutTypes {
  sut: CreateProductController
  createProductStub: CreateProduct
  productValidationStub: ProductValidation
}

const makeCreateProductStub = (): CreateProduct => {
  class CreateProductStub implements CreateProduct {
    handle(product: Product): Promise<Product> {
      return new Promise(resolve => resolve(PRODUCT));
    }
  }

  return new CreateProductStub();
}

const makeProductValidationStub = (): ProductValidation => {
  class ProductValidationStub implements ProductValidation {
    handle(body: any): Validated {
      return(VALIDATED);
    }
  }

  return new ProductValidationStub();
}

const makeSut = (): SutTypes => {
  const productValidationStub = makeProductValidationStub();
  const createProductStub = makeCreateProductStub();
  const sut = new CreateProductController(createProductStub, productValidationStub);

  return {
    sut,
    createProductStub,
    productValidationStub
  }
}

describe('CreateProduct Controller', () => {
  it("Should call ProductValidation with correct values", async () => {
    const { sut, productValidationStub } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }

    const ProductValidationSpy = jest.spyOn(productValidationStub, "handle");
    await sut.handle(httpRequest);

    expect(ProductValidationSpy).toHaveBeenCalledWith(PRODUCT);
  });

  it('Should return 400 if any param is no provided', async () => {
    const { sut, productValidationStub } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }

    const validated: Validated = {
      isValid: false,
      error: new MissingParamError("name")
    }

    jest.spyOn(productValidationStub, "handle").mockReturnValue(validated);
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if any param is invalid', async () => {
    const { sut, productValidationStub } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }

    const validated: Validated = {
      isValid: false,
      error: new InvalidParamError("value", "'value' must be a number")
    }

    jest.spyOn(productValidationStub, "handle").mockReturnValue(validated);
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("value", "'value' must be a number"));
  });

  it("Should call CreateProduct with correct values", async () => {
    const { sut, createProductStub } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }

    const createProductSpy = jest.spyOn(createProductStub, "handle");
    await sut.handle(httpRequest);

    expect(createProductSpy).toHaveBeenCalledWith(PRODUCT);
  });

  it('Should return 500 if CreateProduct throws', async () => {
    const { sut, createProductStub } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }
    
    jest.spyOn(createProductStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 201 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(PRODUCT);
  });
});