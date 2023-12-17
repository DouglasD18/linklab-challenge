import { Product } from "../../../domain/models/products"
import { Validated } from "../../../domain/models/validated"
import { UpdateProductController } from "./update-product"
import { InvalidParamError, MissingParamError, ProductValidation, UpdateProduct, serverError } from "./update-product-protocols"

const VALIDATED: Validated = {
  isValid: true
}

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

const NAME = {
  name: PRODUCT.name
};

interface SutTypes {
  sut: UpdateProductController
  updateProductStub: UpdateProduct
  productValidationStub: ProductValidation
}

const makeUpdateProductStub = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    handle(name: string, product: Product): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new UpdateProductStub();
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
  const updateProductStub = makeUpdateProductStub();
  const sut = new UpdateProductController(updateProductStub, productValidationStub);

  return {
    sut,
    updateProductStub,
    productValidationStub
  }
}

describe('UpdateProduct Controller', () => {
  it("Should return 400 if name param is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: PRODUCT
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  })

  it("Should return 400 if name param is invalid", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: {
        name: 27
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('name', "Name must be a string"));
  })

  it("Should call ProductValidation with correct values", async () => {
    const { sut, productValidationStub } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: NAME
    }

    const ProductValidationSpy = jest.spyOn(productValidationStub, "handle");
    await sut.handle(httpRequest);

    expect(ProductValidationSpy).toHaveBeenCalledWith(PRODUCT);
  });

  it('Should return 400 if any param is not provided', async () => {
    const { sut, productValidationStub } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: NAME
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
      body: PRODUCT,
      params: NAME
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

  it("Should call UpdateProduct with correct values", async () => {
    const { sut, updateProductStub } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: NAME
    }

    const UpdateProductSpy = jest.spyOn(updateProductStub, "handle");
    await sut.handle(httpRequest);

    expect(UpdateProductSpy).toHaveBeenCalledWith(PRODUCT.name, PRODUCT);
  });

  it('Should return 500 if UpdateProduct throws', async () => {
    const { sut, updateProductStub } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: NAME
    }
    
    jest.spyOn(updateProductStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 203 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: PRODUCT,
      params: NAME
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBe("No Content");
  });
});