import { Controller, ListProducts, HttpRequest, HttpResponse, ok, serverError } from "./list-products-protocols";

export class ListProductsController implements Controller {
  constructor(private listProducts: ListProducts) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.listProducts.handle();
      return ok(products);
    } catch (error) {
      return serverError();
    }
  }
}