export interface ActionInterface<T = undefined> {
  type: string;
  payload: T;
}
