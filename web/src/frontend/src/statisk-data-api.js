import { fetchToJson } from './api-utils';

const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

export function hentVeilederinfo() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/me', MED_CREDENTIALS);
}

export function hentEnheter() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/enheter', MED_CREDENTIALS);
}

export function hentTekster() {
    return fetchToJson('/modiaflatefs/api/tekster');
}
