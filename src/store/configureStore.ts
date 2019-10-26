import {ApplicationState} from './application-state.interface';
import {Store} from 'redux';
import {configureStoreDev} from './configureStore.dev';
import {configureStoreProd} from './configureStore.prod';
const selectedConfigureStore: (initialState?: Partial<ApplicationState>) => Store =
    process.env.NODE_ENV === 'production'
        ? configureStoreProd
        : configureStoreDev;

export const configureStore = selectedConfigureStore;
