import React from 'react';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Lenker from './lenker';
import { erstattMiljoPlaceholder } from './utils';


function Oppstartsbilde({ enheter, aktivEnhet = undefined, settAktivEnhet, veilederinfo }) {
    const enhet = aktivEnhet || enheter[0].enhetId;

    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');
    const syfoUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/sykefravaersoppfoelging');

    return (
        <div>
            <div className="velkomstmelding blokk-l">
                <FormattedMessage
                    id="modia.velkomstmelding"
                    values={{ navn: veilederinfo.veileder.navn, ident: veilederinfo.veileder.ident }}
                />
            </div>
            <div className="enhetsvelger__wrapper">
                <select className="enhetsvelger blokk-l" onBlur={(event) => (settAktivEnhet(event.currentTarget.value))}>
                    {enheter.map((e) =>
                        <option key={e.enhetId} value={e.enhetId}>{`${e.enhetId} ${e.navn}`}</option>)}
                </select>
            </div>
            <Lenker
                arbeidsmarked={miaUrl}
                enhet={`/veilarbportefoljeflatefs/enhet?enhet=${enhet}`}
                minoversikt={`/veilarbportefoljeflatefs/portefolje?enhet=${enhet}`}
                modia={modiaUrl}
                sykefravaer={syfoUrl}
            />
        </div>
    );
}

Oppstartsbilde.propTypes = {
    enheter: PT.arrayOf(PT.object).isRequired,
    aktivEnhet: PT.string,
    settAktivEnhet: PT.func.isRequired,
    veilederinfo: PT.shape({ navn: PT.string, ident: PT.string }).isRequired
};

export default Oppstartsbilde;
