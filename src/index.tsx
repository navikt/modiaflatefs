import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

import './index.less';

if (process.env.NODE_ENV !== 'production') {
    console.log('Med mock'); // tslint:disable-line no-console
    require('./mocks'); // tslint:disable-line
}

ReactDOM.render(<App />, document.getElementById('application'));