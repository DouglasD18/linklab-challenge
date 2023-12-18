import { Controller, CreateProduct, ProductValidation, HttpRequest, HttpResponse, badRequest, created, serverError } from "./create-product-protocols";

export class CreateProductController implements Controller {
  constructor(
    private createProduct: CreateProduct,
    private productValidation: ProductValidation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validated = this.productValidation.handle(httpRequest.body);

    if (!validated.isValid) {
      return badRequest(validated.error!);
    }

    try {
      const product = await this.createProduct.handle(httpRequest.body);

      return created(product);
    } catch (error) {
      return serverError();
    }
  }
  
}
