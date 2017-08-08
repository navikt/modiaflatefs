import React from 'react';
import PT from 'prop-types';

function Lenker({ arbeidsmarked, enhet, minoversikt, modia, sykefravaer }) {
    return (
        <div className="lenker">
            <a className="lenke lenke--frittstaende" href={arbeidsmarked}>Arbeidsmarked</a>
            <a className="lenke lenke--frittstaende" href={enhet}>Enhetens oversikt</a>
            <a className="lenke lenke--frittstaende" href={minoversikt}>Min oversikt</a>
            <a className="lenke lenke--frittstaende" href={modia}>Modia brukerdialog</a>
            <a className="lenke lenke--frittstaende" href={sykefravaer}>Sykefravær</a>
        </div>
    );
}

Lenker.propTypes = {
    arbeidsmarked: PT.string.isRequired,
    enhet: PT.string.isRequired,
    minoversikt: PT.string.isRequired,
    modia: PT.string.isRequired,
    sykefravaer: PT.string.isRequired
};

export default Lenker;
