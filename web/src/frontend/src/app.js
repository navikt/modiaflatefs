import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Oppstartsbilde from './oppstartsbilde';
import { initialState, STATUS } from './utils';
import NAVLogo from './nav-logo';
import Innholdslaster from './innholdslaster';
import { hentVeilederinfo, hentEnheter, hentTekster, notifyModiaContextHolder } from './api';

addLocaleData(nb);

class App extends Component {
    componentWillMount() {
        this.state = initialState;

        hentEnheter()
            .then((res) => this.setState({ enheter: { status: STATUS.OK, enhetliste: res.enhetliste } }))
            .catch((error) => this.setState({ enheter: { status: STATUS.ERROR, data: error } }));

        hentVeilederinfo()
            .then((res) => this.setState({ veilederinfo: { veileder: res, status: STATUS.OK } }))
            .catch((error) => this.setState({ veilederinfo: { status: STATUS.ERROR, data: error } }));

        hentTekster()
            .then((res) => this.setState({ tekster: { data: res, status: STATUS.OK } }))
            .catch((error) => this.setState({ tekster: { status: STATUS.ERROR, data: error } }));

        this.changeEnhet = this.changeEnhet.bind(this);
    }

    changeEnhet(enhetId) {
        this.setState({ valgtEnhet: enhetId });
        notifyModiaContextHolder({ enhet: enhetId });
    }

    render() {
        const { enheter, valgtEnhet, tekster, veilederinfo } = this.state;
        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster.data.nb}>
                <div className="modia blokk-xl">
                    <NAVLogo />
                    <div className="tittel blokk-xl">Modia</div>
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

export default App;
