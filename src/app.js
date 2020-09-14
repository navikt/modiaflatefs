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
import { hentVeilederinfo, hentEnheter } from './statisk-data-api';
import tekster from './tekster'

const corId = '0000-0000-0000-0000'.replace(/0/g, (a, i) => { return Math.round(Math.random()*16).toString(16); });
function log(message) {
    window.frontendlogger.info(`[CorId: ${corId}] ${message}`);
}

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
                log(`Hentet enheter: ${res.enhetliste.length}`);
                this.setState({ enheter: { status: STATUS.OK, enhetliste: res.enhetliste } }, this.doHentAktivEnhet);
            })
            .catch((err) => this.apiKallFeilet(err));
        hentVeilederinfo()
            .then((res) => this.setState({ veilederinfo: { veileder: res, status: STATUS.OK } }))
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
        const harTilgangPaEnhet = this.state.enheter.enhetliste.map((enhet) => enhet.enhetId).indexOf(enhetId) >= 0;
        log(`Oppdater aktiv enhet: ${enhetId} har tilgang: ${harTilgangPaEnhet} evt. initiell enhet ${this.state.enheter.enhetliste[0]}`);
        if (!enhetId || enhetId === '' || !harTilgangPaEnhet) {
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
        log(`Henter aktiv enhet`);
        return hentAktivEnhet()
            .then(this.oppdaterAktivEnhet)
            .catch((err) => this.apiKallFeilet(err));
    }

    apiKallFeilet(err) {
        log(`Api feilet: ${err.toString()}`);
        window.frontendlogger.error(err.toString());
        this.setState({ apiKallFeilet: true });
        console.error(err); // eslint-disable-line no-console
    }

    render() {
        const avhengigheter = [
            this.state.enheter,
            this.state.veilederinfo,
            this.state.aktivEnhet
        ];

        if (this.state.apiKallFeilet) {
            return <Feilside500 />;
        }

        return (
            <IntlProvider defaultLocale="nb" locale="nb" messages={tekster.nb}>
                <div className="modiaflatefs blokk-xl">
                    <NAVLogo />
                    <div className="tittel blokk-xl">
                        <FormattedMessage id="modiaoppstartsbilde.tittel" />
                    </div>
                    <Innholdslaster avhengigheter={avhengigheter}>
                        {
                            ([enheter, veilederinfo, aktivEnhet]) => (
                                <div>
                                    <EnhetContext
                                        veilederIdent={veilederinfo.veileder.ident}
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
                            )
                        }
                    </Innholdslaster>
                </div>
            </IntlProvider>
        );
    }
}

export default Application;
