import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiData} from './api-data.interface';
import {Repository} from './repository';
import {PagedResult} from './paged-result.interace';
import {RepositoryRequest} from './repository.interface';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ListUtils} from '../utils/list.utils';
import {ListPayload} from './list-payload';
import {Dispatch} from 'redux';

const defaultResponseToState = <T>(result: AxiosResponse<any>): PagedResult<T> => {
  return {
    list: result.data,
    total: parseInt(result.headers['x-total-count'], 10) || 0,
  };
};

export class ListRepository<T, P extends ListPayload, S = T> extends Repository<PagedResult<T>, P, PagedResult<S>> {
  constructor(
    protected actionType: string,
    protected payloadToConfig: (payload: P) => AxiosRequestConfig,
    protected selector: (state: any) => ApiData<PagedResult<S>>,
    protected responseToState: (response: AxiosResponse) => PagedResult<T> = defaultResponseToState,
  ) {
    super(actionType, payloadToConfig, selector, responseToState);
  }

  protected setEffects(
    data: ApiData<PagedResult<S>>,
    payload: P,
    dispatch: Dispatch,
    lastRequested: RepositoryRequest<P>
  ): void {
    const history = useHistory();
    const {query} = payload;
    const {page, size} = query;
    const total = (data.data && data.data.total) || 0;

    let needsRedirect = false;
    const fixedQuery = {...query};
    if (!page || !size) {
      fixedQuery.page = page || 1;
      fixedQuery.size = size || 10;
      needsRedirect = true;
    } else {
      const maxPage = Math.ceil(total / size);
      if (page > 1 && page > maxPage && data.data) {
        fixedQuery.page = 1;
        needsRedirect = true;
      }
    }
    useEffect(() => {
      if (needsRedirect) {
        history.replace(ListUtils.getQueryString(fixedQuery));
      }
    }, [needsRedirect, history, page, size, total]);

    useEffect(() => {
      if (!needsRedirect) {
        return this.fetchData(dispatch, payload);
      }
    }, [dispatch, payload, needsRedirect]);

    useEffect(() => {
      if (lastRequested.payload !== null) {
        return this.fetchData(dispatch, lastRequested.payload);
      }
    }, [dispatch, lastRequested.timestamp, lastRequested.payload]);
  }

}
