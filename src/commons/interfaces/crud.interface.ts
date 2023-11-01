export interface ICrudRepository<Q> {
  get(): Promise<Array<Q>>;
  getById(id: string): Promise<Q>;
  create<R>(doc: R | Q): Promise<Q>;
  update<R>(id: string, doc: R | Q): Promise<Q>;
  delete(id: string): Promise<boolean>;
}
export interface IAggregateCrudRepository<Q, C> {
  get(): Promise<Array<Q>>;
  getById(id: string): Promise<Q>;
  create<R>(doc: R | Q): Promise<C>;
  update<R>(id: string, doc: R | Q): Promise<C>;
  delete(id: string): Promise<boolean>;
}
