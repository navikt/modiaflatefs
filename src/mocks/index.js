import FetchMock, {MiddlewareUtils} from "yet-another-fetch-mock";
import {contentTypeMiddleware, failurerateMiddleware} from './utils';

console.log('=========================='); // tslint:disable-line
console.log('======== MED MOCK ========'); // tslint:disable-line
console.log('=========================='); // tslint:disable-line

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        contentTypeMiddleware,
        failurerateMiddleware(0.02),
        MiddlewareUtils.loggingMiddleware()
    )
});

const me = {
    ident: 'Z999999',
    navn: 'Fornavn Ettersen',
    fornavn: 'Fornavn',
    etternavn: 'Ettersen',
    enheter: [
        {enhetId: '0101', navn: 'NAV Tatooine'},
        {enhetId: '0211', navn: 'NAV Naboo'},
        {enhetId: '0709', navn: 'NAV Larvik'},
        {enhetId: '0104', navn: 'NAV Moss'},
        {enhetId: '0109', navn: 'NAV Med et skikkelig langt navn'}
    ]
};
const aktivEnhet = {
    aktivEnhet: me.enheter[Math.floor(Math.random() * me.enheter.length)].enhetId,
    aktivBruker: null
};

mock.get('/modiacontextholder/api/decorator', (req, res, ctx) => res(
    ctx.delay(1000),
    ctx.json(me))
);

mock.get('/modiacontextholder/api/context/aktivenhet', (req, res, ctx) => res(
    ctx.delay(1000),
    ctx.json(aktivEnhet))
);

mock.post('/modiacontextholder/api/context', (req, res, ctx) => res(
    ctx.delay(1000),
    ctx.json({}))
);

