import React from 'react';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Lenker from './lenker';
import { erstattMiljoPlaceholder } from './utils';
import { aktivEnhetShape, enhetlisteShape } from './modell';


function Oppstartsbilde({ enheter, aktivEnhet, settAktivEnhet, veilederinfo }) {
    const enhetId = aktivEnhet.enhet.enhetId;

    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');
    const syfoUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/sykefravaersoppfoelging');

    const handleOnChange = (event) => {
        const nyAktivEnhetId = event.currentTarget.value;
        if (nyAktivEnhetId !== enhetId) {
            settAktivEnhet(nyAktivEnhetId);
        }
    };

    const handleOnBlur = (event) => {
        const nyAktivEnhetId = event.currentTarget.value;
        if (nyAktivEnhetId !== enhetId) {
            settAktivEnhet(nyAktivEnhetId);
        }
    };

    return (
        <div>
            <div className="velkomstmelding blokk-l">
                <FormattedMessage
                    id="modia.velkomstmelding"
                    values={{ navn: veilederinfo.veileder.navn, ident: veilederinfo.veileder.ident }}
                />
            </div>
            <div className="enhetsvelger__wrapper">
                <select
                    className="enhetsvelger blokk-l"
                    onChange={(event) => (handleOnChange(event))}
                    onBlur={(event) => (handleOnBlur(event))}
                    defaultValue={enheter.find((e) => e.enhetId === enhetId)}
                >
                    {enheter.map((e) =>
                        (<option
                            key={e.enhetId}
                            value={e.enhetId}
                        >
                            {`${e.enhetId} ${e.navn}`}
                        </option>)
                    )}
                </select>
            </div>
            <Lenker
                arbeidsmarked={miaUrl}
                enhet={`/veilarbportefoljeflatefs/enhet?enhet=${enhetId}`}
                minoversikt={`/veilarbportefoljeflatefs/portefolje?enhet=${enhetId}`}
                modia={modiaUrl}
                sykefravaer={syfoUrl}
            />
        </div>
    );
}

Oppstartsbilde.propTypes = {
    enheter: enhetlisteShape.isRequired,
    aktivEnhet: aktivEnhetShape.isRequired,
    settAktivEnhet: PT.func.isRequired,
    veilederinfo: PT.shape({ navn: PT.string, ident: PT.string }).isRequired
};

export default Oppstartsbilde;
