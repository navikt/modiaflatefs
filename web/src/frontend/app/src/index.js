import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

if (process.env.NODE_ENV !== 'production') {
    console.log('Med mock'); // eslint-disable-line no-console
    require('./mocks'); // eslint-disable-line global-require
}

ReactDOM.render(<App />, document.getElementById('application'));
