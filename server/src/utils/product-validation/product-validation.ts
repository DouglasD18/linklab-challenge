import { InvalidParamError, MissingParamError, ProductValidation, Validated } from "./product-validation-protocols";

export class ProductValidationAdapter implements ProductValidation {

  handle(body: any): Validated {
    const fields = ["name", "image", "note", "value"];

    for (const field of fields) {
      if (!body[field]) {
        return {
          isValid: false,
          error: new MissingParamError(field)
        }
      }
    }

    if (typeof body.name !== "string") {
      return {
        isValid: false,
        error: new InvalidParamError("name", "'name' must be a string!")
      }
    } else if (typeof body.image !== "string") {
      return {
        isValid: false,
        error: new InvalidParamError("image", "'image' must be a string!")
      }
    } else if (typeof body.note !== "number") {
      return {
        isValid: false,
        error: new InvalidParamError("note", "'note' must be a number!")
      }
    } else if (typeof body.value !== "number") {
      return {
        isValid: false,
        error: new InvalidParamError("value", "'value' must be a number!")
      }
    }

    return {
      isValid: true
    }
  }

}