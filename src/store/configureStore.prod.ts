import {createStore, Store} from 'redux';
import createRootReducer from './reducers';

const rootReducer = createRootReducer();

export function configureStoreProd(initialState?: {}): Store {
    return createStore(rootReducer, initialState);
}
