import { fetchToJson } from './api-utils';

const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

export function hentVeilederinfo() {
    return fetchToJson('/veilarbveileder/api/veileder/me', MED_CREDENTIALS);
}

export function hentEnheter() {
    return fetchToJson('/veilarbveileder/api/veileder/enheter', MED_CREDENTIALS);
}
