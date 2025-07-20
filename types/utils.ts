export interface PartialResult<TInitial, TDeferred> {
  initialData: TInitial;
  getDeferredData: () => Promise<TDeferred>;
}