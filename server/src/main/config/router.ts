import { Router, Express } from "express";

import createRouter from "../routes/create-product/create-product";
import listProducts from "../routes/list-products/list-products";
import updateProduct from "../routes/update-product/update-product";
import deleteProduct from "../routes/delete-product/delete-product";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/product", router);
  createRouter(router);
  listProducts(router);
  updateProduct(router);
  deleteProduct(router);
}
