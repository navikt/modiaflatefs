FROM ghcr.io/navikt/modialogin/modialogin-frontend:3fc56866a5458607f73eef1f8bd1b3e20ce9d649-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
