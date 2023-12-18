import { Router } from "express";
import { makeCreateProductController } from "../../factories";
import { adapterRoute } from "../../adapter/express-router-adapter";

export default (router: Router): void => {
  router.post("/", adapterRoute(makeCreateProductController()));
}
