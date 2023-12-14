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

const { name, image, note, value } = PRODUCT;


describe("CreateProduct Route", () => {
  beforeAll(async () => {
    await MongoHelper.connect();
  })

  afterAll(async () => {
    const productsCollection = await MongoHelper.getCollection("products");
    await productsCollection.deleteMany({});
    await MongoHelper.disconnect();
  })

  beforeEach(async () => {
    const productsCollection = await MongoHelper.getCollection("products");
    await productsCollection.deleteMany({});
  })
  
  it("Should return 400 if name is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ image, note, value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if image is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, note, value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if note is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, image, value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if value is missing", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, image, note });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if name is not a string", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name: 12, image, note, value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if image is not a string", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, image: 18, note, value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if note is not a number", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, image, note: "5", value });

    expect(response.statusCode).toBe(400);
  })

  it("Should return 400 if value is not a number", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send({ name, image, note, value: "Dez" });

    expect(response.statusCode).toBe(400);
  })

  it("Should return the product on success", async () => {
    const response = await request(app)
      .post(ROUTE)
      .send(PRODUCT);
      
    expect(response.statusCode).toBe(201);
  }) 
})