import { Router, Express } from "express";

import createRouter from "../routes/create-product/create-product";
import listProducts from "../routes/list-products/list-products";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/product", router);
  createRouter(router);
  listProducts(router);
}
