import React from 'react';
import PT from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

function Lenker({ enhet, minoversikt, modia, rekrutteringsbistand, sykefravaer, intl }) {
    return (
        <div className="lenker">
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={modia}>
                        {intl.formatMessage({ id: 'lenke.modiabrukerdialog' })}
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={enhet}>
                        {intl.formatMessage({ id: 'lenke.portefolje' })}
                    </a>
                </div>
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={minoversikt}>
                        {intl.formatMessage({ id: 'lenke.portefolje.minoversikt' })}
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={sykefravaer}>
                        {intl.formatMessage({ id: 'lenke.sykefravear' })}
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={rekrutteringsbistand}>
                        {intl.formatMessage({ id: 'lenke.rekrutteringsbistand' })}
                    </a>
                </div>
            </div>
        </div>
    );
}

Lenker.propTypes = {
    enhet: PT.string.isRequired,
    minoversikt: PT.string.isRequired,
    modia: PT.string.isRequired,
    rekrutteringsbistand: PT.string.isRequired,
    sykefravaer: PT.string.isRequired,
    intl: intlShape.isRequired
};

export default injectIntl(Lenker);
