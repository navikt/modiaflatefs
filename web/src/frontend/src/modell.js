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
