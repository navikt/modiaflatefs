/*eslint-disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';

const me = require('./me');
const enheter = require('./enheter');
const aktivEnhet = require('./aktivEnhet');


mock.get('/veilarbveileder/api/veileder/me', respondWith(randomFailure(delayed(1000,me))));
mock.get('/veilarbveileder/api/veileder/enheter', respondWith(randomFailure(delayed(1000,enheter))));
mock.post('/modiacontextholder/api/context', respondWith(delayed(1000, {})));
mock.get('/modiacontextholder/api/context/aktivenhet', respondWith(delayed(1000, aktivEnhet)));

mock.mock('*', respondWith((url, config) => mock.realFetch.call(window, url, config)));
