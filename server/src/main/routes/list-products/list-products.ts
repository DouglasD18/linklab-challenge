import { Router } from "express";
import { adapterRoute } from "../../adapter/express-router-adapter";
import { makeListProductsController } from "../../factories/list-products";

export default (router: Router): void => {
  router.get("/", adapterRoute(makeListProductsController()));
}
