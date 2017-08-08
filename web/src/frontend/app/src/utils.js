export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    ERROR: 'ERROR'
};

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
    }
};

function finnMiljoStreng() {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex + 1, dotIndex);
}

export function erstattMiljoPlaceholder(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', `-${miljoStreng}`);
    }
    return lenke.replace('{{miljoStreng}}', miljoStreng);
}
