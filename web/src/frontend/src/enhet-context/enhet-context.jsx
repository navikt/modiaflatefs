import * as React from 'react';
import PT from 'prop-types';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import EnhetContextListener, {EnhetConnectionState, EnhetContextEventNames} from './enhet-context-listener';
import { erDev } from '../utils';
import {aktivEnhetShape} from "../modell";

class EnhetContext extends React.Component {
    contextListener;

    constructor(props) {
        super(props);
        this.state = {
            connected: EnhetConnectionState.NOT_CONNECTED
        };
        this.enhetContextHandler = this.enhetContextHandler.bind(this);
    }

    componentDidMount() {
        const host = erDev() ? 'app-t4.adeo.no' : window.location.hostname;
        const uri = `wss://${host}/modiaeventdistribution/websocket`;
        this.contextListener = new EnhetContextListener(uri, this.enhetContextHandler);
    }

    componentWillUnmount() {
        this.contextListener.close();
    }

    enhetContextHandler(event) {
        switch (event.type) {
            case EnhetContextEventNames.CONNECTION_STATE_CHANGED:
                this.setState({...this.state, connected: event.state});
                break;
            case EnhetContextEventNames.NY_AKTIV_ENHET:
                this.props.hentAktivEnhet();
                break;
            default:
                return;
        }
    }

    render() {
        const alertIkkeTilkoblet = (
            <AlertStripeAdvarselSolid>
                <FormattedMessage id="nyenhet.tilkobling.feilet" />
            </AlertStripeAdvarselSolid>
        );

        return (
            <div>
                { this.state.connected === EnhetConnectionState.FAILED ? alertIkkeTilkoblet : null }
            </div>
        );
    }
}

EnhetContext.propTypes = {
    aktivEnhet: aktivEnhetShape.isRequired,
    hentAktivEnhet: PT.func.isRequired
};

export default EnhetContext;
