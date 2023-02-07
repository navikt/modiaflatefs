FROM ghcr.io/navikt/modialogin/modialogin-frontend:0c7d9faa0b43caad94d3de25b77687188fb77c76-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
