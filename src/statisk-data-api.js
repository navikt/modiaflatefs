import { fetchToJson } from './api-utils';

const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

export function hentBrukerdata() {
    return fetchToJson('/modiaflatefs/proxy/modiacontextholder/api/decorator', MED_CREDENTIALS);
}