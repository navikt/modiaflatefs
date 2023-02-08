FROM ghcr.io/navikt/modialogin/modialogin-frontend:ba499d07fdeb08a1adcfdb9b35ddd0682483fd9d-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
