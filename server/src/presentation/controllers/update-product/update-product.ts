import { Controller, UpdateProduct, ProductValidation, HttpRequest, HttpResponse, badRequest, MissingParamError, InvalidParamError, noContent, notFound, serverError } from "./update-product-protocols";

export class UpdateProductController implements Controller {
  constructor(
    private updateProduct: UpdateProduct,
    private productValidation: ProductValidation 
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const name = httpRequest.params?.name;
    
    if (!name || name.length < 1) {
      return badRequest(new MissingParamError("name"));
    } else if (typeof name !== "string") {
      return badRequest(new InvalidParamError("name", "Name must be a string"));
    }

    const validation = this.productValidation.handle(httpRequest.body);

    if (!validation.isValid) {
      return badRequest(validation.error!);
    }

    try {
      const product = httpRequest.body;

      await this.updateProduct.handle(name, product);
      return noContent();
    } catch (error) {
      if (error instanceof Error && error.name === "NotFoundError") {
        return notFound();
      }

      return serverError();
    }
  }

}