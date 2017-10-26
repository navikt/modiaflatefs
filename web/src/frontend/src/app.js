import React, { Component } from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Feilside500 from './feilsider/500';
import Oppstartsbilde from './oppstartsbilde';
import { STATUS } from './utils';
import { initialState } from './modell';
import NAVLogo from './nav-logo';
import Innholdslaster from './innholdslaster';
import { hentVeilederinfo, hentEnheter, hentTekster, notifyModiaContextHolder } from './api/api';

addLocaleData(nb);

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        hentEnheter()
            .then((res) => new Promise((success) => {
                this.setState({ enheter: { status: STATUS.OK, enhetliste: res.enhetliste } });
                success(res);
            }))
            .then((res) => {
                if (this.state.aktivEnhet.status === STATUS.PENDING) {
                    this.settInitiellAktivEnhet(res.enhetliste[0]);
                }
            })
            .catch(() => this.apiKallFeilet());

        hentVeilederinfo()
            .then((res) => this.setState({ veilederinfo: { veileder: res, status: STATUS.OK } }))
            .catch(() => this.apiKallFeilet());

        hentTekster()
            .then((res) => this.setState({ tekster: { data: res, status: STATUS.OK } }))
            .catch(() => this.apiKallFeilet());

        this.settAktivEnhet = this.settAktivEnhet.bind(this);
    }

    settInitiellAktivEnhet(enhet) {
        this.setState({
            aktivEnhet: {
                status: STATUS.OK,
                enhet
            }
        });
        notifyModiaContextHolder({ enhet: enhet.enhetId });
    }

    settAktivEnhet(enhetId) {
        const valgtEnhet = this.state.enheter.enhetliste.find((enhet) => enhet.enhetId === enhetId);
        this.setState({
            aktivEnhet: {
                status: STATUS.OK,
                enhet: valgtEnhet
            }
        });
        notifyModiaContextHolder({ enhet: enhetId });
    }

    apiKallFeilet() {
        this.setState({ apiKallFeilet: true });
    }

    render() {
        const { enheter, aktivEnhet, tekster, veilederinfo, apiKallFeilet } = this.state;
        return (
            apiKallFeilet ?
                <Feilside500 />
                :
                <IntlProvider defaultLocale="nb" locale="nb" messages={tekster.data.nb}>
                    <div className="modiaflatefs blokk-xl">
                        <NAVLogo />
                        <div className="tittel blokk-xl">
                            <FormattedMessage id="modiaoppstartsbilde.tittel" />
                        </div>
                        <Innholdslaster avhengigheter={[enheter, tekster, veilederinfo, aktivEnhet]}>
                            <Oppstartsbilde
                                enheter={enheter.enhetliste}
                                aktivEnhet={aktivEnhet}
                                settAktivEnhet={this.settAktivEnhet}
                                veilederinfo={veilederinfo}
                            />
                        </Innholdslaster>
                    </div>
                </IntlProvider>
        );
    }
}

export default Application;
