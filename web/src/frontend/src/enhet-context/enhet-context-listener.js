export const EnhetConnectionState = {
    CONNECTED: 'connected',
    NOT_CONNECTED: 'not_connected',
    FAILED: 'failed'
};

const EventMessages = {
    ESTABLISHED: 'Connection Established',
    PING: 'ping!',
    NY_AKTIV_ENHET: 'NY_AKTIV_ENHET'
};

export const EnhetContextEventNames = {
    CONNECTION_STATE_CHANGED: 'connection_state_changed',
    NY_AKTIV_ENHET: 'ny_aktiv_enhet'
};

export default class EnhetContextListener {
    connection;
    connectionState;
    callback;
    closing;
    retryTimeout;
    hearthbeatInterval;

    constructor(uri, cb) {
        this.callback = cb;
        this.lagWebSocketConnection(uri);
    }

    close() {
        this.closing = true;
        clearTimeout(this.retryTimeout);
        clearInterval(this.hearthbeatInterval);
        this.connection.close();
    }

    lagWebSocketConnection(uri) {
        if (this.closing) {
            return;
        }

        this.connection = new WebSocket(uri);

        this.connection.onopen = () => {
            this.connection.send('Hello, World!');
            this.hearthbeatInterval = setInterval(() => {
                this.connection.send('Hello, World!');
            }, 10000);
        };

        this.connection.onmessage = (e) => {
            if (e.data === EventMessages.ESTABLISHED || e.data === EventMessages.PING) {
                this.connectionState = EnhetConnectionState.CONNECTED;
                this.callback({
                    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED,
                    state: EnhetConnectionState.CONNECTED
                });
            } else if (e.data === EventMessages.NY_AKTIV_ENHET) {
                this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
            }
        };

        this.connection.onerror = () => {
            this.connectionState = EnhetConnectionState.FAILED;
            this.callback({
                type: EnhetContextEventNames.CONNECTION_STATE_CHANGED,
                state: EnhetConnectionState.FAILED
            });
        };

        this.connection.onclose = () => {
            clearInterval(this.hearthbeatInterval);
            if (!this.closing) {
                this.connectionState = EnhetConnectionState.FAILED;
                this.callback({
                    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED,
                    state: EnhetConnectionState.FAILED
                });
                this.retryTimeout = setTimeout(() => this.lagWebSocketConnection(uri), 1000);
            } else {
                this.connectionState = EnhetConnectionState.NOT_CONNECTED;
                this.callback({
                    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED,
                    state: EnhetConnectionState.NOT_CONNECTED
                });
            }
        };
    }
}
