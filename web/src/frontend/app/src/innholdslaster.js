import React from 'react';
import PT from 'prop-types';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { STATUS } from './utils';

function Innholdslaster({ children, avhengigheter }) {
    if (avhengigheter.find((a) => a.status === STATUS.ERROR)) {
        return (
            <div className="feilmelding">
                <p>Det skjedde en feil ved innlastningen av data</p>
            </div>);
    }
    if (avhengigheter.find((a) => a.status === STATUS.PENDING)) {
        return (
            <div className="innholdslaster">
                <NavFrontendSpinner storrelse="xxl" />
            </div>
        );
    }
    return (
        children
    );
}

Innholdslaster.propTypes = {
    children: PT.node.isRequired,
    avhengigheter: PT.arrayOf(PT.object).isRequired
};

export default Innholdslaster;
