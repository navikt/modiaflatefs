import { fetchToJson } from './api-utils';

const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

const changeContextConfig = (enhet) => ({
    ...MED_CREDENTIALS,
    method: 'post',
    body: JSON.stringify({ verdi: enhet, eventType: 'NY_AKTIV_ENHET' })
});

export function hentVeilederinfo() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/me', MED_CREDENTIALS);
}

export function hentEnheter() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/enheter', MED_CREDENTIALS);
}

export function hentTekster() {
    return fetchToJson('/modiaflatefs/api/tekster');
}

export function notifyModiaContextHolder({ enhet }) {
    return fetchToJson('/modiacontextholder/api/context', changeContextConfig(enhet));
}

