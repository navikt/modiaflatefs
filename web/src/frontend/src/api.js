const credentials = 'same-origin';

const MED_CREDENTIALS = {
    credentials,
    headers: {
        'Content-Type': 'application/json'
    }
};

const CHANGE_CONTEXT_CONFIG = (enhet) => ({
    ...MED_CREDENTIALS,
    method: 'post',
    body: JSON.stringify({ verdi: enhet, eventType: 'NY_AKTIV_ENHET' })
});

export function sjekkStatuskode(response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function toJson(response) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

function fetchToJson(url, config = {}) {
    return fetch(url, config)// eslint-disable-line no-undef
        .then(sjekkStatuskode)
        .then(toJson);
}

export function hentVeilederinfo() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/me', MED_CREDENTIALS);
}

export function hentEnheter() {
    return fetchToJson('/veilarbveileder/tjenester/veileder/enheter', MED_CREDENTIALS);
}

export function hentTekster() {
    return fetchToJson('/modiaoppstartsbilde/api/tekster');
}

export function notifyModiaContextHolder({ enhet }) {
    return fetchToJson('/modiacontextholder/api/context', CHANGE_CONTEXT_CONFIG(enhet));
}

