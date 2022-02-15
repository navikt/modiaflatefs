import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './index.less';

if (process.env.REACT_APP_MOCK === 'true') {
    console.log('Med mock'); // tslint:disable-line no-console
    require('./mocks'); // tslint:disable-line
}

ReactDOM.render(<App />, document.getElementById('application'));
