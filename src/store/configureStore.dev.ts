import {applyMiddleware, compose, createStore, Store} from 'redux';
import createRootReducer from './reducers';

const rootReducer = createRootReducer();

export const configureStoreDev = (initialState?: {}): Store => {
    const middleware: any[] = [];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middleware));

    return createStore(rootReducer, initialState, enhancer);
};
