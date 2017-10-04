import React from 'react';
import PT from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

function Lenker({ arbeidsmarked, enhet, minoversikt, modia, sykefravaer, intl }) {
    return (
        <div className="lenker">
            <a className="lenke lenke--frittstaende" href={arbeidsmarked}>
                {intl.formatMessage({id:'lenke.mia'})}
            </a>
            <a className="lenke lenke--frittstaende" href={enhet}>
                {intl.formatMessage({id:'lenke.portefolje'})}
            </a>
            <a className="lenke lenke--frittstaende" href={minoversikt}>
                {intl.formatMessage({id:'lenke.portefolje.minoversikt'})}
            </a>
            <a className="lenke lenke--frittstaende" href={modia}>
                {intl.formatMessage({id:'lenke.modiabrukerdialog'})}
            </a>
            <a className="lenke lenke--frittstaende" href={sykefravaer}>
                {intl.formatMessage({id:'lenke.sykefravear'})}
            </a>
        </div>
    );
}

Lenker.propTypes = {
    arbeidsmarked: PT.string.isRequired,
    enhet: PT.string.isRequired,
    minoversikt: PT.string.isRequired,
    modia: PT.string.isRequired,
    sykefravaer: PT.string.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(Lenker);
