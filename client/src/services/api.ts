import { Product } from "@/types/Product";

const URL = "http://localhost:3333/api/product/";

export const request = async (): Promise<Product[]> => {
  return fetch(URL).then(res => res.body) as unknown as Product[];
}
