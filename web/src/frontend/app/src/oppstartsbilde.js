import React from 'react';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Lenker from './lenker';
import { erstattMiljoPlaceholder } from './utils';


function Oppstartsbilde({ enheter, valgtEnhet, velgEnhet, veilederinfo }) {
    if (!enheter) {
        return null;
    }
    const enhet = valgtEnhet || enheter[0].enhetId;

    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');
    const syfoUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/moteoversikt');

    return (
        <div>
            <div className="velkomstmelding blokk-l">
                <FormattedMessage
                    id="modiaoppstartsbilde.velkomstmelding"
                    values={{ navn: veilederinfo.veileder.navn, ident: veilederinfo.veileder.ident }}
                />
            </div>
            <div className="enhetsvelger__wrapper">
                <select className="enhetsvelger blokk-l" onBlur={(event) => (velgEnhet(event.currentTarget.value))}>
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
    valgtEnhet: PT.string,
    velgEnhet: PT.func.isRequired,
    veilederinfo: PT.shape({ navn: PT.string, ident: PT.string }).isRequired
};

Oppstartsbilde.defaultProps = {
    valgtEnhet: undefined
};

export default Oppstartsbilde;
