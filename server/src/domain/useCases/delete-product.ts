export interface DeleteProduct {
  handle(name: string): Promise<void>;
}