FROM ghcr.io/navikt/modialogin/modialogin-frontend:40fa8f2676a6b6a6e47436cb19a6961e3ea48ef3-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
