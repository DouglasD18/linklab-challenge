import request from 'supertest';
import app from '../../config/app';

import { Product } from '../../../domain/models/products';
import { MongoHelper } from '../../../infra/db/mongo/helpers/mongo-helper';

const ROUTE = "/api/product";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
};


describe("UpdateProduct Route", () => {
  beforeAll(async () => {
    const productsCollection = await MongoHelper.getCollection("products");
    await productsCollection.insertOne(PRODUCT);
  })

  afterAll(async () => {
    const productsCollection = await MongoHelper.getCollection("products");
    await productsCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  it("Should return 400 if name is missing in param", async () => {
    const response = await request(app)
      .delete(ROUTE);

    expect(response.statusCode).toBe(400);
  })

  it("Should return 404 if product do not exists",async () => {
    const response = await request(app)
      .delete(ROUTE + "/New Product");
      
    expect(response.statusCode).toBe(404);
  })

  it("Should return the product on success", async () => {
    const response = await request(app)
      .delete(ROUTE + "/Product");
      
    expect(response.statusCode).toBe(204);
  }) 
})