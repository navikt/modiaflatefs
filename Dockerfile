FROM ghcr.io/navikt/modialogin/modialogin-frontend:d20cb03f41587293c9936ba98fe1164647789e9a

ADD proxy-config.json /proxy-config.json
COPY build /www
