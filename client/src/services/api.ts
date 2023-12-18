import { Product } from "@/types/Product";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/product"
});

export const request = async (): Promise<Product[]> => {
  return (await api.get("/")).data;
}
