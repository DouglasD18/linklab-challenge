export interface DeleteProductRepository {
  handle(name: string): Promise<boolean>;
}
