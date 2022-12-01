FROM ghcr.io/navikt/modialogin/modialogin-frontend:f3e2ea794128fd9bd39ebb91a0e20dbd83b7dcb2-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
