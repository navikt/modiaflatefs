import WebsocketImpl, {Status} from './websocket-impl';

export enum EnhetConnectionState {
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected',
    FAILED = 'failed'
}

export enum EventMessages {
    ESTABLISHED = 'Connection Established',
    PING = 'ping!',
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET'
}

export enum EnhetContextEventNames {
    CONNECTION_STATE_CHANGED = 'connection_state_changed',
    NY_AKTIV_ENHET = 'ny_aktiv_enhet'
}

interface ConnectionStateChanged {
    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED;
    state: EnhetConnectionState;
}

interface NyAktivEnhet {
    type: EnhetContextEventNames.NY_AKTIV_ENHET;
}

export type EnhetContextEvent = ConnectionStateChanged | NyAktivEnhet;

export default class EnhetContextListener {
    private connection: WebsocketImpl;
    private callback: (event: EnhetContextEvent) => void;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.connection = new WebsocketImpl(uri, {
            onOpen: this.onOpen.bind(this),
            onMessage: this.onMessage.bind(this),
            onError: this.onError.bind(this),
            onClose: this.onClose.bind(this)
        });
        this.connection.open();
    }

    public close() {
        this.connection.close();
    }

    private onOpen() {
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.CONNECTED });
    }

    private onMessage(e: MessageEvent) {
        if (e.data === EventMessages.NY_AKTIV_ENHET) {
            this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
        }
    }

    private onError() {
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: EnhetConnectionState.FAILED });
    }

    private onClose() {
        const nyState = this.connection.getStatus() === Status.CLOSE ? EnhetConnectionState.NOT_CONNECTED : EnhetConnectionState.FAILED;
        this.callback({ type: EnhetContextEventNames.CONNECTION_STATE_CHANGED, state: nyState });
    }
}
