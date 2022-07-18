FROM ghcr.io/navikt/modialogin/modialogin-frontend:5bd7ebb1a695e7e82a457bf682ef873bb8cfbfc2

ADD proxy-config.json /proxy-config.json
COPY build /www
