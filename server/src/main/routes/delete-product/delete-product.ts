import { Router } from "express";
import { adapterRoute } from "../../adapter/express-router-adapter";
import { makeDeleteProductController } from "../../factories/delete-product";

export default (router: Router): void => {
  router.delete("/:name", adapterRoute(makeDeleteProductController()));
}
