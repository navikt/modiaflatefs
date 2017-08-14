import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // eslint-disable-line import/no-unresolved
import App from './app';
import './polyfill/polyfills';

if (process.env.NODE_ENV !== 'production') {
    console.log('Med mock'); // eslint-disable-line no-console
    require('./mocks'); // eslint-disable-line global-require
}

ReactDOM.render(<App />, document.getElementById('application'));
