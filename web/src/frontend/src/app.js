import React, { Component } from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Feilside500 from './feilsider/500';
import Oppstartsbilde from './oppstartsbilde';
import { initialState, STATUS } from './utils';
import NAVLogo from './nav-logo';
import Innholdslaster from './innholdslaster';
import { hentVeilederinfo, hentEnheter, hentTekster, notifyModiaContextHolder } from './api';

addLocaleData(nb);

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        hentEnheter()
            .then((res) => this.setState({ enheter: { status: STATUS.OK, enhetliste: res.enhetliste } }))
            .catch(() => this.setFeilet());

        hentVeilederinfo()
            .then((res) => this.setState({ veilederinfo: { veileder: res, status: STATUS.OK } }))
            .catch(() => this.setFeilet());

        hentTekster()
            .then((res) => this.setState({ tekster: { data: res, status: STATUS.OK } }))
            .catch(() => this.setFeilet());

        this.changeEnhet = this.changeEnhet.bind(this);
    }

    setFeilet() {
        this.setState({ feilet: true });
    }

    changeEnhet(enhetId) {
        this.setState({ valgtEnhet: enhetId });
        notifyModiaContextHolder({ enhet: enhetId });
    }

    render() {
        const { enheter, valgtEnhet, tekster, veilederinfo, feilet } = this.state;

        return (
            feilet ?
                <Feilside500 />
                :
                <IntlProvider defaultLocale="nb" locale="nb" messages={tekster.data.nb}>
                    <div className="modiaflatefs blokk-xl">
                        <NAVLogo />
                        <div className="tittel blokk-xl">
                            <FormattedMessage id="modiaoppstartsbilde.tittel" />
                        </div>
                        <Innholdslaster avhengigheter={[enheter, tekster, veilederinfo]}>
                            <Oppstartsbilde
                                enheter={enheter.enhetliste}
                                valgtEnhet={valgtEnhet}
                                velgEnhet={this.changeEnhet}
                                veilederinfo={veilederinfo}
                            />
                        </Innholdslaster>
                    </div>
                </IntlProvider>
        );
    }
}

export default Application;
