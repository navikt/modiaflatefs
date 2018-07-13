import { fetchToJson } from '../api-utils';

const MED_CREDENTIALS = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
};

export function hentAktivEnhet() {
    return fetchToJson('/modiacontextholder/api/context/aktivenhet', MED_CREDENTIALS)
        .then((data) => data.aktivEnhet);
}

export function oppdaterKontekstHolder(enhet) {
    return fetch('/modiacontextholder/api/context', {
        ...MED_CREDENTIALS,
        method: 'post',
        body: JSON.stringify({
            verdi: enhet,
            eventType: 'NY_AKTIV_ENHET'
        })
    });
}
