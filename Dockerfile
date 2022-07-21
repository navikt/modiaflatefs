FROM ghcr.io/navikt/modialogin/modialogin-frontend:80b8cc67d357c45d8e372341f42d294c4afc5bf5

#ADD proxy-config.json /proxy-config.json
COPY build /www
