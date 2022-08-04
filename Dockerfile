FROM ghcr.io/navikt/modialogin/modialogin-frontend:459c4e98cab4d2d2c189b55bf97aadf29ace43b8

ADD proxy-config.json /proxy-config.json
COPY build /www
