import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import {App} from './App';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __APP_DOC_PREVIEW: string;
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
