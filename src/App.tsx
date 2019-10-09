import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {TopBar} from './common/components/top-bar/top-bar';
import {Content} from './common/components/content/content';

export const App: React.FC = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <TopBar/>
                <Content/>
            </BrowserRouter>
        </div>
    );
};
