import PT from 'prop-types';
import { STATUS } from './utils';

export const initialState = {
    enheter: {
        status: STATUS.PENDING,
        enhetliste: []
    },
    veilederinfo: {
        status: STATUS.PENDING,
        veileder: null
    },
    tekster: {
        status: STATUS.PENDING,
        data: {
            nb: {
                spinner: 'spinner'
            }
        }
    },
    apiKallFeilet: false,
    aktivEnhet: {
        status: STATUS.PENDING,
        enhet: undefined
    }
};

const enhetShape = PT.shape({
    enhetId: PT.string,
    navn: PT.string
});

export const aktivEnhetShape = PT.shape({
    status: PT.oneOf([STATUS.PENDING, STATUS.OK]),
    enhet: enhetShape
});

export const enhetlisteShape = PT.arrayOf(enhetShape);
