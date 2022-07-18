FROM ghcr.io/navikt/modialogin/modialogin-frontend:89c395cbfa3888cb5e094617137c76123897488a-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
