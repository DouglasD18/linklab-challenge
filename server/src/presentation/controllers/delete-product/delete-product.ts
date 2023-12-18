import { Controller, DeleteProduct, HttpRequest, HttpResponse, badRequest, MissingParamError, InvalidParamError, noContent, notFound, serverError } from "./delete-product-protocols";

export class DeleteProductController implements Controller {
  constructor(private deleteProduct: DeleteProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const name = httpRequest.params?.name;
    
    if (!name || name.length < 1) {
      return badRequest(new MissingParamError("name"));
    } else if (typeof name !== "string") {
      return badRequest(new InvalidParamError("name", "Name must be a string"));
    }
    
    try {
      await this.deleteProduct.handle(name);
      
      return noContent();
    } catch (error) {
      if (error instanceof Error && error.name === "NotFoundError") {
        return notFound();
      }

      return serverError();
    }
  }
  
}