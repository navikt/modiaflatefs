FROM ghcr.io/navikt/modialogin/modialogin-frontend:ba6cb5eb6b86d0d0b5d2b5aa599ef8910c4b2f70-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
