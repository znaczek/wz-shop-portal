import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {TopBar} from './common/components/top-bar/top-bar';
import {Content} from './common/components/content/content';
import {Provider} from 'react-redux';
import {configureStore} from './store/configureStore';

const store = configureStore();

export const App: React.FC = () => {
    return (
      <Provider store={store}>
        <div className='App'>
            <BrowserRouter>
                <TopBar/>
                <Content/>
            </BrowserRouter>
        </div>
      </Provider>
    );
};
