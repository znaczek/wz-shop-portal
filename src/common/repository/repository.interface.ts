import {ActionInterface} from '../interface/action.interface';
import {ApiData} from './api-data.interface';
import {Reducer} from 'redux';

export interface RepositoryInterface<T, P, S = T> {
  useEffect: (payload: P, shouldPerformCall: boolean) => [ApiData<S>, RepositoryComponentActions<T, P>];
  reducer: Reducer<ApiData<T> | undefined, ActionInterface<T | P>>;
}

export interface RepositoryTypes {
  start: string;
  success: string;
  error: string;
}

export interface RepositoryStoreActions<T, P> {
  start: (payload: P) => ActionInterface<P>;
  success: (payload: T) => ActionInterface<T>;
  error: (payload: any) => ActionInterface<any>;
}

export interface RepositoryComponentActions<T, P> {
  start: (payload: P) => void;
  success: (payload: T) => void;
  error: (payload: any) => void;
}

export interface RepositoryRequest<T> {
  payload: T | null;
  timestamp: number;
}
