import React, { Component } from 'react';
import * as Sentry from "@sentry/browser";
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Oppstartsbilde from './oppstartsbilde';
import { STATUS } from './utils';
import NAVLogo from './nav-logo';
import Innholdslaster from './innholdslaster';
import { hentAktivEnhet, oppdaterKontekstHolder } from './enhet-context/context-api';
import EnhetContext from './enhet-context/enhet-context';
import { initiellState } from './modell';
import { hentBrukerdata } from './statisk-data-api';
import Lenker from "./lenker";

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = initiellState;

        this.settAktivEnhet = this.settAktivEnhet.bind(this);
        this.oppdaterAktivEnhet = this.oppdaterAktivEnhet.bind(this);
        this.doHentAktivEnhet = this.doHentAktivEnhet.bind(this);
    }

    componentDidMount() {
        hentBrukerdata()
            .then((res) => {
                this.setState({
                    enheter: { status: STATUS.OK, enhetliste: res.enheter },
                    veilederinfo: { status: STATUS.OK, veileder: res }
                }, this.doHentAktivEnhet);
            })
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
        return hentAktivEnhet()
            .then(this.oppdaterAktivEnhet)
            .catch((err) => this.apiKallFeilet(err));
    }

    apiKallFeilet(err) {
        Sentry.captureException(err);
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
            return (
                <div className="modiaflatefs blokk-xl">
                    <NAVLogo />
                    <div className="tittel blokk-xl">
                        Modia
                    </div>
                    <AlertStripeAdvarsel className="blokk-m enheter-feiler">
                        Noe gikk galt med uthenting av dine enheter.
                    </AlertStripeAdvarsel>
                    <Lenker />
                </div>
            );
        }

        return (
            <div className="modiaflatefs blokk-xl">
                <NAVLogo />
                <div className="tittel blokk-xl">
                    Modia
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
        );
    }
}

export default Application;
