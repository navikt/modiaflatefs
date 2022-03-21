import React from 'react';
import PT from 'prop-types';
import Lenker from './lenker';
import { erstattMiljoPlaceholder, erstattMiljoPlaceholderNais, erstattMiljoPlaceholderNaisIntern } from './utils';
import { aktivEnhetShape, enhetlisteShape } from './modell';
import { oppdaterKontekstHolder } from './enhet-context/context-api';


function Oppstartsbilde({ enheter, aktivEnhet, settAktivEnhet, veilederinfo }) {
    const enhetId = aktivEnhet.enhet.enhetId;
    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const syfoUrl = erstattMiljoPlaceholderNaisIntern('https://syfooversikt.{{miljoStreng}}/enhet');
    const rekrutteringsbistandUrl = erstattMiljoPlaceholderNaisIntern('https://rekrutteringsbistand.{{miljoStreng}}/');

    const handleOnChange = (event) => {
        const nyAktivEnhetId = event.currentTarget.value;
        settAktivEnhet(nyAktivEnhetId);
        oppdaterKontekstHolder(nyAktivEnhetId);
    };

    return (
        <div>
            <div className="velkomstmelding blokk-l">
                Hei, {veilederinfo.veileder.navn} ({veilederinfo.veileder.ident}) velg enhet og hva du vil jobbe med
            </div>
            <div className="enhetsvelger__wrapper blokk-l">
                <select
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
                enhet={`/veilarbportefoljeflatefs/enhet?enhet=${enhetId}`}
                minoversikt={`/veilarbportefoljeflatefs/portefolje?enhet=${enhetId}`}
                modia={modiaUrl}
                sykefravaer={syfoUrl}
                rekrutteringsbistand={rekrutteringsbistandUrl}
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
