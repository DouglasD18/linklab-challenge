export class NotFoundError extends Error {
  constructor() {
    super(`Product Not Found`);
    this.name = "NotFoundError";
  }
}