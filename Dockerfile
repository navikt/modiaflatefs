FROM ghcr.io/navikt/modialogin/modialogin-frontend:e809d83a540fbe2eee0170cdca2a254d00e9acc0

ADD proxy-config.json /proxy-config.json
COPY build /www
