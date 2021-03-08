import React from 'react';
import PT from 'prop-types';

function Lenker({ enhet, minoversikt, modia, rekrutteringsbistand, sykefravaer }) {
    return (
        <div className="lenker">
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={modia}>
                        Personoversikt
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={enhet}>
                        Enhetens oversikt
                    </a>
                </div>
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={minoversikt}>
                        Min oversikt
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={sykefravaer}>
                        Sykefravær
                    </a>
                </div>
            </div>
            <div className="lenker__kolonne">
                <div className="lenker__celle">
                    <a className="lenke lenke--frittstaende" href={rekrutteringsbistand}>
                        Rekrutteringsbistand
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
    sykefravaer: PT.string.isRequired
};

export default Lenker;
