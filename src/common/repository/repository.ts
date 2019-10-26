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
import {Dispatch} from 'redux';

export class Repository<T, P = undefined, S = T> implements RepositoryInterface<T, P, S> {

  public reducer: (state: ApiData<T> | undefined, action: ActionInterface<T | P>) => ApiData<T>;

  private types: RepositoryTypes;
  protected actions: RepositoryComponentActions<T, P>;

  constructor(
    protected actionType: string,
    protected payloadToConfig: (payload: P) => AxiosRequestConfig,
    protected selector: (state: any) => ApiData<S>,
    protected responseToState: (response: AxiosResponse) => T = (response) => response.data,
  ) {
    this.types = this.getTypes(actionType);
    this.actions = this.getActionCreators();
    this.reducer = this._reducer.bind(this);
  }

  public useEffect(payload: P): [ApiData<S>, RepositoryComponentActions<T, P>] {
    const memoizedPayload = useMemoizedPayload(payload);
    const [lastRequested, doRequest] = useState<RepositoryRequest<P>>({
      payload: null,
      timestamp: new Date().getTime(),
    });
    const data = useSelector(this.selector);
    const dispatch = useDispatch();

    this.setEffects(data, memoizedPayload, dispatch, lastRequested);

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

  protected setEffects(data: ApiData<S>, payload: P, dispatch: Dispatch, lastRequested: RepositoryRequest<P>): void {
    useEffect(() => {
      return this.fetchData(dispatch, payload);
    }, [dispatch, payload]);

    useEffect(() => {
      if (lastRequested.payload !== null) {
        return this.fetchData(dispatch, lastRequested.payload);
      }
    }, [dispatch, lastRequested.timestamp, lastRequested.payload]);
  }

  private getTypes(actionType: string): RepositoryTypes {
    return {
      start: actionType,
      success: `${actionType} success`,
      error: `${actionType} error`
    };
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

  protected fetchData(dispatch: Dispatch<any>, p: P) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    (async () => {
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
    })();
    return source.cancel;
  }

  private _reducer(state: ApiData<T> | undefined, action: ActionInterface<T | P>) {
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
        return state;
    }
  }

}
