import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app';
import './index.less';

if (process.env.REACT_APP_MOCK === 'true') {
    console.log('Med mock'); // tslint:disable-line no-console
    require('./mocks'); // tslint:disable-line
}

let container = document.getElementById('application');
const root = ReactDOM.createRoot(container!);
root.render(<App />);
