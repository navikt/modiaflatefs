/*eslint-disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';

const me = require('./me');
const enheter = require('./enheter');
const tekster = require('./tekster');
const aktivEnhet = require('./aktivEnhet');


mock.get('/veilarbveileder/tjenester/veileder/me', respondWith(randomFailure(delayed(1000,me))));
mock.get('/veilarbveileder/tjenester/veileder/enheter', respondWith(randomFailure(delayed(1000,enheter))));
mock.get('/modiaflatefs/api/tekster', respondWith(randomFailure(delayed(5000,tekster))));
mock.post('/modiacontextholder/api/context', respondWith(delayed(1000, {})));
mock.get('/modiacontextholder/api/context/aktivenhet', respondWith(delayed(1000, aktivEnhet)));

mock.mock('*', respondWith((url, config) => mock.realFetch.call(window, url, config)));
