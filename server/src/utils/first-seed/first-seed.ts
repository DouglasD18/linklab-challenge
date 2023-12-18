import { readFile } from "fs/promises";
import path from "path";
import { MongoHelper } from "../../infra/db/mongo/helpers/mongo-helper";

const readSvg = async (file: string) => {
  try {
    const data = await readFile(path.resolve("./images/" + file), { encoding: "utf-8" });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async () => {
  const first = await readSvg("first.svg");
  const second = await readSvg("second.svg");
  const third = await readSvg("third.svg");

  const products = [
    {
      name: "Name here",
      note: 9.0,
      value: 200.00,
      image: first
    },
    {
      name: "Name here",
      note: 9.0,
      value: 300.00,
      image: second
    },
    {
      name: "Name here",
      note: 9.0,
      value: 90.00,
      image: third
    }
  ]

  const productCollection = await MongoHelper.getCollection("products");
  await productCollection.deleteMany({});
  await productCollection.insertMany(products);
}