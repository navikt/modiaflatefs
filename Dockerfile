FROM ghcr.io/navikt/modialogin/modialogin-frontend:63b47eacfa85f54d4389679eedde6d8ca4ca3bb3-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
