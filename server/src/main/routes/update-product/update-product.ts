import { Router } from "express";
import { adapterRoute } from "../../adapter/express-router-adapter";
import { makeUpdateProductController } from "../../factories/update-product";

export default (router: Router): void => {
  router.put("/:name", adapterRoute(makeUpdateProductController()));
}
