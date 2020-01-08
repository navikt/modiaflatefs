/*eslint-disable*/
import { mock, respondWith, delayed, randomFailure } from './utils';

const me = {
    ident: 'Z990281',
    navn: 'F_Z990281 E_Z990281',
    fornavn: 'F_Z990281',
    etternavn: 'E_Z990281'
};

const enheter = {
    enhetliste: [
        { enhetId: '0101', navn: 'NAV Tatooine' },
        { enhetId: '0211', navn: 'NAV Naboo' },
        { enhetId: '0709', navn: 'NAV Larvik' },
        { enhetId: '0104', navn: 'NAV Moss' },
        { enhetId: '0109', navn: 'NAV Med et skikkelig langt navn' }
    ]
};

const aktivEnhet = enheter.enhetliste[Math.floor(Math.random() * enheter.enhetliste.length)];

mock.get('/veilarbveileder/api/veileder/me', respondWith(randomFailure(delayed(1000,me))));
mock.get('/veilarbveileder/api/veileder/enheter', respondWith(randomFailure(delayed(1000,enheter))));
mock.post('/modiacontextholder/api/context', respondWith(delayed(1000, {})));
mock.get('/modiacontextholder/api/context/aktivenhet', respondWith(delayed(1000, aktivEnhet)));

mock.mock('*', respondWith((url, config) => mock.realFetch.call(window, url, config)));
