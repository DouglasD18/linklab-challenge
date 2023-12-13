import { Product } from "../../domain/models/products";
import { ProductValidationAdapter } from "./product-validation";
import { InvalidParamError, MissingParamError } from "./product-validation-protocols";

const sut = new ProductValidationAdapter();

const PRODUCT: Product = {
  name: "Product",
  image: "SVG",
  note: 7,
  value: 12.5
}

describe("ProductValidation", () => {
  it("Should return a MissingParamError if name is no provided", () => {
    const validated = sut.handle({
      name: "",
      image: PRODUCT.image,
      note: PRODUCT.note,
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("name"));
  });

  it("Should return a MissingParamError if image is no provided", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: "",
      note: PRODUCT.note,
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("image"));
  });

  it("Should return a MissingParamError if note is no provided", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: PRODUCT.image,
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("note"));
  });

  it("Should return a MissingParamError if value is no provided", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: PRODUCT.image,
      note: PRODUCT.note
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new MissingParamError("value"));
  });

  it("Should return a InvalidParamError if name is invalid", () => {
    const validated = sut.handle({
      name: 0.8,
      image: PRODUCT.image,
      note: PRODUCT.note,
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("name", "'name' must be a string!"));
  });

  it("Should return a InvalidParamError if image is invalid", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: 18,
      note: PRODUCT.note,
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("image", "'image' must be a string!"));
  });

  it("Should return a InvalidParamError if note is invalid", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: PRODUCT.image,
      note: "Nota",
      value: PRODUCT.value
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("note", "'note' must be a number!"));
  });

  it("Should return a InvalidParamError if value is invalid", () => {
    const validated = sut.handle({
      name: PRODUCT.name,
      image: PRODUCT.image,
      note: PRODUCT.note,
      value: "Valor"
    });

    expect(validated.isValid).toBe(false);
    expect(validated.error).toEqual(new InvalidParamError("value", "'value' must be a number!"));
  });
})