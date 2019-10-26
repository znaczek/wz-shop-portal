import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiData} from './api-data.interface';
import {Repository} from './repository';
import {PagedResult} from './paged-result.interace';

const defaultResponseToState = <T>(result: AxiosResponse<any>): PagedResult<T> => {
  return {
    list: result.data,
    total: result.headers['X-Total'] || 0,
  };
};

export class ListRepository<T, P = undefined, S = T> extends Repository<PagedResult<T> , P, PagedResult<S>> {
  constructor(
    protected actionType: string,
    protected payloadToConfig: (payload: P) => AxiosRequestConfig,
    protected selector: (state: any) => ApiData<PagedResult<S>>,
    protected responseToState: (response: AxiosResponse<any>) => PagedResult<T> = defaultResponseToState,
  ) {
    super(actionType, payloadToConfig, selector, responseToState);
  }
}
