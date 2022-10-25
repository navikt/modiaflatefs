import React from 'react';
import PT from 'prop-types';
import { erstattMiljoPlaceholder, erstattMiljoPlaceholderNaisIntern } from "./utils";

function Lenker({ enhetId }) {
    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const syfoUrl = erstattMiljoPlaceholderNaisIntern('https://syfooversikt.{{miljoStreng}}/enhet');
    const portefoljeflateUrl = erstattMiljoPlaceholderNaisIntern('https://veilarbportefoljeflate.{{miljoStreng}}');
    const rekrutteringsbistandUrl = erstattMiljoPlaceholderNaisIntern('https://rekrutteringsbistand.{{miljoStreng}}/');
    const enhetQueryParam = enhetId ? `?enhet=${enhetId}` : '';

    return (
        <div className="lenker">
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={modiaUrl}>
                        Personoversikt
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={`${portefoljeflateUrl}/enhet${enhetQueryParam}`}>
                        Enhetens oversikt
                    </a>
                </div>
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={`${portefoljeflateUrl}/portefolje${enhetQueryParam}`}>
                        Min oversikt
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={syfoUrl}>
                        Sykefravær
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={rekrutteringsbistandUrl}>
                        Rekrutteringsbistand
                    </a>
                </div>
            </div>
        </div>
    );
}

Lenker.propTypes = {
    enhetId: PT.string,
};

export default Lenker;
