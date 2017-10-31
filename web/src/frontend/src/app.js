import React, { Component } from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import Feilside500 from './feilsider/500';
import Oppstartsbilde from './oppstartsbilde';
import { STATUS } from './utils';
import NAVLogo from './nav-logo';
import Innholdslaster from './innholdslaster';
import { hentAktivEnhet, oppdaterKontekstHolder } from './enhet-context/context-api';
import EnhetContext from './enhet-context/enhet-context';
import { initiellState } from './modell';
import { hentVeilederinfo, hentEnheter, hentTekster } from './api/api';

addLocaleData(nb);

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = initiellState;

        this.settAktivEnhet = this.settAktivEnhet.bind(this);
        this.oppdaterAktivEnhet = this.oppdaterAktivEnhet.bind(this);
        this.doHentAktivEnhet = this.doHentAktivEnhet.bind(this);
    }

    componentDidMount() {
        hentEnheter()
            .then((res) => {
                this.setState({ enheter: { status: STATUS.OK, enhetliste: res.enhetliste } });
                this.doHentAktivEnhet();
            })
            .catch((err) => this.apiKallFeilet(err));
        hentVeilederinfo()
            .then((res) => this.setState({ veilederinfo: { veileder: res, status: STATUS.OK } }))
            .catch((err) => this.apiKallFeilet(err));
        hentTekster()
            .then((res) => this.setState({ tekster: { data: res, status: STATUS.OK } }))
            .catch((err) => this.apiKallFeilet(err));
    }

    settInitiellAktivEnhet(enhet) {
        this.setState({
            aktivEnhet: {
                status: STATUS.OK,
                enhet
            }
        });
    }

    settAktivEnhet(enhetId) {
        const valgtEnhet = this.state.enheter.enhetliste.find((enhet) => enhet.enhetId === enhetId);
        this.setState({
            aktivEnhet: {
                status: STATUS.OK,
                enhet: valgtEnhet
            }
        });
    }

    oppdaterAktivEnhet(enhetId) {
        if (enhetId === '') {
            const initiellEnhet = this.state.enheter.enhetliste[0];
            this.settInitiellAktivEnhet(initiellEnhet);
            oppdaterKontekstHolder(initiellEnhet.enhetId);
            return;
        }
        const { aktivEnhet } = this.state;
        if (!aktivEnhet.enhet || enhetId !== aktivEnhet.enhet.enhetId) {
            this.settAktivEnhet(enhetId);
        }
    }

    doHentAktivEnhet() {
        return hentAktivEnhet()
            .then(this.oppdaterAktivEnhet)
            .catch((err) => this.apiKallFeilet(err));
    }

    apiKallFeilet(err) {
        this.setState({ apiKallFeilet: true });
        console.error(err);
    }

    render() {
        const { aktivEnhet, apiKallFeilet, tekster, enheter, veilederinfo } = this.state;
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
                            <div>
                                <EnhetContext
                                    aktivEnhet={aktivEnhet}
                                    hentAktivEnhet={this.doHentAktivEnhet}
                                />
                                <Oppstartsbilde
                                    enheter={enheter.enhetliste}
                                    aktivEnhet={aktivEnhet}
                                    settAktivEnhet={this.settAktivEnhet}
                                    veilederinfo={veilederinfo}
                                />
                            </div>
                        </Innholdslaster>
                    </div>
                </IntlProvider>
        );
    }
}

export default Application;
