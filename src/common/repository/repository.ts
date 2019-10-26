import {useCallback, useEffect, useState} from 'react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  RepositoryComponentActions,
  RepositoryInterface,
  RepositoryRequest,
  RepositoryStoreActions,
  RepositoryTypes
} from './repository.interface';
import {ActionInterface} from '../interface/action.interface';
import {ApiData} from './api-data.interface';
import {useMemoizedPayload} from '../hooks/memoized-payload';

export class Repository<T, P = undefined, S = T> implements RepositoryInterface<T, P, S> {

  private types: RepositoryTypes;
  private actions: RepositoryComponentActions<T, P>;

  private static getTypes(actionType: string): RepositoryTypes {
    return {
      start: actionType,
      success: `${actionType} success`,
      error: `${actionType} error`
    };
  }

  constructor(
    protected actionType: string,
    protected payloadToConfig: (payload: P) => AxiosRequestConfig,
    protected selector: (state: any) => ApiData<S>,
    protected responseToState: (response: AxiosResponse<any>) => T = (response) => response.data,
  ) {
    this.types = Repository.getTypes(actionType);
    this.actions = this.getActionCreators();
  }

  public reducer = (state: ApiData<T> | undefined, action: ActionInterface<T | P>) => {
    if (state === undefined) {
      return {
        data: null,
        isLoading: false,
        error: null,
      };
    }
    switch (action.type) {
      case this.types.start:
        return {
          data: state.data,
          isLoading: true,
          error: null
        };
      case this.types.success:
        return {
          isLoading: false,
          error: null,
          data: action.payload as T,
        };
      case this.types.error:
        return {
          data: state.data,
          isLoading: false,
          error: action.payload,
        };
      default:
        return {
          data: null,
          isLoading: false,
          error: null,
        };
    }
  }

  public useEffect(payload: P): [ApiData<S>, RepositoryComponentActions<T, P>] {
    const memoizedPayload = useMemoizedPayload(payload);
    const [lastRequested, doRequest] = useState<RepositoryRequest<P>>({
      payload: null,
      timestamp: new Date().getTime(),
    });
    const data = useSelector(this.selector);
    const dispatch = useDispatch();

    useEffect(() => {
      return this.getFetchDataFunction(dispatch, memoizedPayload);
    }, [dispatch, memoizedPayload]);

    useEffect(() => {
      if (lastRequested.payload !== null) {
        return this.getFetchDataFunction(dispatch, lastRequested.payload);
      }
    }, [dispatch, lastRequested.timestamp, lastRequested.payload]);

    useEffect(() => {
      return () => console.log('unmount');
    }, []);

    return [data, {
      start: useCallback((p) => {
        doRequest({
          timestamp: new Date().getTime(),
          payload: p,
        });
      }, [doRequest]),
      success: useCallback((p) => dispatch(this.actions.success(p)), [dispatch]),
      error: useCallback((p) => dispatch(this.actions.error(p)), [dispatch]),
    }];
  }

  private getActionCreators(): RepositoryStoreActions<T, P> {
    return {
      start: (payload: P) => ({
        type: this.types.start,
        payload
      }),
      success: (payload: T) => ({
        type: this.types.success,
        payload
      }),
      error: (payload: any) => ({
        type: this.types.error,
        payload
      }),
    };
  }

  private getFetchDataFunction(dispatch: any, p: P) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      dispatch(this.actions.start(p));
      let result;
      try {
        result = await axios.request({
          cancelToken: source.token,
          ...this.payloadToConfig(p),
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          dispatch(this.actions.error(error));
        }
        return;
      }
      dispatch(this.actions.success(this.responseToState(result)));
    };
    fetchData();
    return source.cancel;
  }

}
