FROM ghcr.io/navikt/modialogin/modialogin-frontend:a03432e8b4555517437ba48bae6652271b929c7e-beta

ADD proxy-config.json /proxy-config.json
COPY build /www
