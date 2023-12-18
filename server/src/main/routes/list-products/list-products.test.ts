import request from 'supertest';
import app from '../../config/app';

import { Product } from '../../../domain/models/products';
import { MongoHelper } from '../../../infra/db/mongo/helpers/mongo-helper';

const ROUTE = "/api/product/";

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

describe("ListProducts Route", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  })

  afterAll(async () => {
    const productsCollection = await MongoHelper.getCollection("products");
    await productsCollection.deleteMany({});
    await MongoHelper.disconnect();
  })
  
  it("Should return the products on success", async () => {
    const response = await request(app)
      .get(ROUTE);
      
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBeFalsy();
  }) 

  it("Should return the products on success", async () => {
    await request(app)
      .post(ROUTE)
      .send(PRODUCT);

    const response = await request(app)
      .get(ROUTE);
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([PRODUCT]);
  }) 
})