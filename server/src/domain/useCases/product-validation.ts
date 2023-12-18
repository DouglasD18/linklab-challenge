import { Validated } from "../models/validated";

export interface ProductValidation {
  handle(body: any): Validated;
}
