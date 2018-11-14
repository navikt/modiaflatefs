import React from 'react';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Lenker from './lenker';
import { erstattMiljoPlaceholder } from './utils';
import { aktivEnhetShape, enhetlisteShape } from './modell';
import { oppdaterKontekstHolder } from './enhet-context/context-api';


function Oppstartsbilde({ enheter, aktivEnhet, settAktivEnhet, veilederinfo }) {
    const enhetId = aktivEnhet.enhet.enhetId;
    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');
    const syfoUrl = erstattMiljoPlaceholder('https://app{{miljoStreng}}.adeo.no/sykefravaersoppfoelging');

    const handleOnChange = (event) => {
        const nyAktivEnhetId = event.currentTarget.value;
        settAktivEnhet(nyAktivEnhetId);
        oppdaterKontekstHolder(nyAktivEnhetId);
    };

    return (
        <div>
            <div className="velkomstmelding blokk-l">
                <FormattedMessage
                    id="modia.velkomstmelding"
                    values={{ navn: veilederinfo.veileder.navn, ident: veilederinfo.veileder.ident }}
                />
            </div>
            <div className="enhetsvelger__wrapper blokk-l">
                <select // eslint-disable-line jsx-a11y/no-onchange
                    className="enhetsvelger"
                    onChange={(event) => (handleOnChange(event))}
                    value={enheter.map((e) => e.enhetId).find((id) => id === enhetId)}
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